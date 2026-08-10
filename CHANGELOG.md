# Changelog

All notable changes to Atlas Watchtower are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/). Versioning: [SemVer](https://semver.org/).

---

## [2.5.5] — 2026-08-10

### Added
- Supercluster Web Worker for off-main-thread spatial indexing
- MapTiler basemap support (`VITE_MAPTILER_KEY`)
- 3D building extrusion at zoom ≥ 14
- Filtered data cache for pan/zoom performance
- Zoom-based fire data reduction

### Changed
- Throttled map move events to ~30fps
- Quantized time filtering to reduce GC pressure
- Added smooth zoom inertia

### Removed
- `test-flights.mjs`, `military-flights.backup.ts`, `electron-app/`

---

## [2.5.0] — 2026-07

### Added
- Commercial flight tracking, CII panel, strategic posture panel
- Gulf FDI tracking, 12-language i18n, desktop auto-updater

---

## [2.0.0] — 2026-05

### Added
- deck.gl WebGL rendering, Web Workers, client-side ML
- Protobuf API layer, PWA, Tauri desktop app

---

## [1.0.0] — 2026-01

### Added
- Initial release with MapLibre map, 20+ layers, news, markets
