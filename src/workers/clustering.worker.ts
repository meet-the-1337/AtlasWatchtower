/**
 * Web Worker for Supercluster spatial clustering.
 * Offloads O(n·log·n) Supercluster index builds and O(n) getClusters() calls
 * from the main thread so that pan/zoom never causes jank.
 *
 * Supports 4 cluster types: protests, techHQs, techEvents, datacenters.
 *
 * Protocol:
 *   Main → Worker:
 *     { type: 'load',     dataset: string, points: GeoJSON[], options: SuperclusterOptions }
 *     { type: 'cluster',  dataset: string, bbox: [w,s,e,n], zoom: number }
 *
 *   Worker → Main:
 *     { type: 'loaded',   dataset: string }
 *     { type: 'clusters', dataset: string, clusters: Feature[], leaves?: Record<number, Feature[]> }
 *     { type: 'error',    dataset: string, error: string }
 *     { type: 'ready' }
 */

// Supercluster is an ES module — Vite handles the import for worker bundles
import Supercluster from 'supercluster';

// ── Types ───────────────────────────────────────────────────────────────────

interface SuperclusterOptions {
  radius?: number;
  maxZoom?: number;
  map?: (props: Record<string, unknown>) => Record<string, unknown>;
  reduce?: (accumulated: Record<string, unknown>, props: Record<string, unknown>) => void;
}

interface LoadMessage {
  type: 'load';
  dataset: string;
  points: Array<{
    type: 'Feature';
    geometry: { type: 'Point'; coordinates: [number, number] };
    properties: Record<string, unknown>;
  }>;
  options: SuperclusterOptions;
}

interface ClusterMessage {
  type: 'cluster';
  dataset: string;
  bbox: [number, number, number, number];
  zoom: number;
  maxLeaves?: number;
}

type InMessage = LoadMessage | ClusterMessage;

// ── State ───────────────────────────────────────────────────────────────────

const indices = new Map<string, Supercluster>();

// ── Handlers ────────────────────────────────────────────────────────────────

function handleLoad(msg: LoadMessage): void {
  try {
    const sc = new Supercluster({
      radius: msg.options.radius ?? 60,
      maxZoom: msg.options.maxZoom ?? 14,
      // map/reduce can't be passed through postMessage (functions aren't serializable)
      // Instead we pass the raw points and apply map/reduce logic on the main thread
      // when consuming the results. The worker only handles the spatial indexing.
    });

    sc.load(msg.points);
    indices.set(msg.dataset, sc);

    self.postMessage({ type: 'loaded', dataset: msg.dataset });
  } catch (err) {
    self.postMessage({
      type: 'error',
      dataset: msg.dataset,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

function handleCluster(msg: ClusterMessage): void {
  const sc = indices.get(msg.dataset);
  if (!sc) {
    self.postMessage({
      type: 'error',
      dataset: msg.dataset,
      error: `No index loaded for dataset "${msg.dataset}"`,
    });
    return;
  }

  try {
    const clusters = sc.getClusters(msg.bbox, msg.zoom);
    const maxLeaves = msg.maxLeaves ?? 200;

    // For each cluster, also return the leaf items so the main thread
    // doesn't need to call getLeaves separately
    const leaves: Record<number, unknown[]> = {};
    for (const feature of clusters) {
      if (feature.properties.cluster) {
        const clusterId = feature.properties.cluster_id as number;
        leaves[clusterId] = sc.getLeaves(clusterId, maxLeaves);
      }
    }

    self.postMessage({ type: 'clusters', dataset: msg.dataset, clusters, leaves });
  } catch (err) {
    self.postMessage({
      type: 'error',
      dataset: msg.dataset,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

// ── Message router ──────────────────────────────────────────────────────────

self.onmessage = (event: MessageEvent<InMessage>) => {
  const msg = event.data;
  switch (msg.type) {
    case 'load':
      handleLoad(msg);
      break;
    case 'cluster':
      handleCluster(msg);
      break;
  }
};

// Signal ready
self.postMessage({ type: 'ready' });
