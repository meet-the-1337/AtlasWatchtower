/**
 * Commercial Flights Service
 *
 * Fetches real-time aircraft positions from OpenSky Network.
 * Uses the dev proxy at /api/opensky/states/all (OAuth2 authenticated via vite plugin).
 * Returns up to MAX_AIRCRAFT in-flight aircraft, sorted by interest (altitude/speed).
 */

import type { CommercialFlight } from '@/types';
import { dataFreshness } from './data-freshness';

interface AirplanesLiveAc {
    hex: string;
    flight?: string;
    r?: string;
    desc?: string;
    lat?: number;
    lon?: number;
    alt_baro?: number | 'ground';
    gs?: number;
    track?: number;
    baro_rate?: number;
    squawk?: string;
    seen_pos?: number;
}

interface AirplanesLiveResponse {
    now: number;
    ac?: AirplanesLiveAc[];
}

// Configuration
const MAX_AIRCRAFT = 4000;   // Max aircraft to show globally
const CACHE_TTL_MS = 4_000;  // 4s cache to allow 5s polling
const OPENSKY_API_URL = 'https://api.airplanes.live/v2/point/0/0/25000';

// Module-level cache
let cache: { flights: CommercialFlight[]; ts: number } | null = null;

/**
 * Parse a raw Airplanes.live state into a CommercialFlight object.
 */
function parseState(ac: AirplanesLiveAc, nowMs: number): CommercialFlight | null {
    if (ac.lat == null || ac.lon == null) return null;

    const onGround = ac.alt_baro === 'ground';
    const altitude = typeof ac.alt_baro === 'number' ? ac.alt_baro * 0.3048 : 0;
    const speed = (ac.gs ?? 0) * 0.51444;
    const verticalRate = (ac.baro_rate ?? 0) * 0.00508;
    const lastContact = Math.floor((nowMs / 1000) - (ac.seen_pos ?? 0));

    return {
        icao24: ac.hex || '',
        callsign: (ac.flight || '').trim(),
        originCountry: ac.desc || ac.r || '',
        lat: ac.lat,
        lon: ac.lon,
        altitude,
        heading: ac.track ?? 0,
        speed,
        verticalRate,
        onGround,
        squawk: ac.squawk,
        lastContact,
    };
}

/**
 * Score a flight for display priority.
 * Higher altitude + higher speed = more interesting to show on map.
 */
function interestScore(f: CommercialFlight): number {
    if (f.onGround) return -1;  // Deprioritise parked aircraft
    return f.altitude / 1000 + f.speed / 100;
}

/**
 * Fetch all live commercial aircraft positions from API.
 * Results are cached for CACHE_TTL_MS to respect rate limits.
 */
export async function fetchCommercialFlights(): Promise<CommercialFlight[]> {
    const now = Date.now();

    // Return cache if fresh
    if (cache && now - cache.ts < CACHE_TTL_MS) {
        return cache.flights;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20_000);

        const resp = await fetch(OPENSKY_API_URL, {
            signal: controller.signal,
            headers: { 'Accept': 'application/json' },
        });

        clearTimeout(timeoutId);

        if (!resp.ok) {
            const msg = `AirplanesLive API error ${resp.status}`;
            console.warn(`[CommercialFlights] ${msg}`);
            dataFreshness.recordError('commercialFlights', msg);
            return cache?.flights ?? [];
        }

        const json = await resp.json() as AirplanesLiveResponse;

        if (!json.ac || !Array.isArray(json.ac)) {
            dataFreshness.recordError('commercialFlights', 'No state data');
            return cache?.flights ?? [];
        }

        // Parse and filter
        const flights: CommercialFlight[] = [];
        for (const state of json.ac) {
            const flight = parseState(state, json.now);
            if (flight) flights.push(flight);
        }

        // Sort by interest and cap at MAX_AIRCRAFT
        flights.sort((a, b) => interestScore(b) - interestScore(a));
        const trimmed = flights.slice(0, MAX_AIRCRAFT);

        cache = { flights: trimmed, ts: now };

        const inAir = trimmed.filter(f => !f.onGround).length;
        console.log(`[CommercialFlights] ${trimmed.length} aircraft (${inAir} airborne)`);
        dataFreshness.recordUpdate('commercialFlights', trimmed.length);

        return trimmed;
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('aborted') || msg.includes('AbortError')) {
            console.warn('[CommercialFlights] Request timed out');
        } else {
            console.error('[CommercialFlights] Fetch error:', msg);
        }
        dataFreshness.recordError('commercialFlights', msg);
        return cache?.flights ?? [];
    }
}

/**
 * Clear the cache (for testing or forced refresh).
 */
export function clearCommercialFlightsCache(): void {
    cache = null;
}
