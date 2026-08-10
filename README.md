<p align="center">
  <img src="public/favico/favicon-32x32.png" alt="Atlas Watchtower" width="80" />
</p>

<h1 align="center">Atlas Watchtower</h1>

<p align="center">
  <strong>Real-time global intelligence dashboard — earthquakes, military flights, cyber threats, markets, and breaking news on one interactive 3D map.</strong>
</p>

<p align="center">
  <a href="https://github.com/meet-the-1337/AtlasWatchtower/releases"><img alt="Latest Release" src="https://img.shields.io/github/v/release/meet-the-1337/AtlasWatchtower?style=flat-square&color=00c896" /></a>
  <a href="https://github.com/meet-the-1337/AtlasWatchtower/actions/workflows/build-desktop.yml"><img alt="Build Status" src="https://img.shields.io/github/actions/workflow/status/meet-the-1337/AtlasWatchtower/build-desktop.yml?style=flat-square&label=desktop%20build" /></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-AGPL--3.0-blue?style=flat-square" /></a>
  <a href="https://github.com/meet-the-1337/AtlasWatchtower/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/meet-the-1337/AtlasWatchtower?style=flat-square&color=yellow" /></a>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Platforms" src="https://img.shields.io/badge/platforms-Windows%20%7C%20macOS%20%7C%20Linux%20%7C%20Web-informational?style=flat-square" />
</p>

<p align="center">
  <a href="#-installation">Install</a> •
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-configuration">Config</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

---

## 📸 Preview

<p align="center">
  <img src="new-world-monitor.png" alt="Atlas Watchtower Dashboard" width="900" />
</p>

---

## 🧭 What Is Atlas Watchtower?

Atlas Watchtower is an **AI-powered, open-source OSINT (Open Source Intelligence) dashboard** that aggregates live data from **30+ sources** onto a single interactive 3D WebGL map.

Instead of juggling 20 browser tabs to track world events, Atlas Watchtower gives you **one screen** with:

- 🌍 Live earthquake and wildfire monitoring
- ✈️ Military and commercial flight tracking
- 🚢 Naval vessel AIS tracking
- 📰 100+ RSS news feeds with AI clustering
- 📊 Stock markets, crypto, and prediction markets
- 🛡️ Cyber threat indicators and internet outage mapping
- 🏛️ Country instability scoring with AI risk analysis

Available as a **web app**, **PWA**, and **native desktop app** (Windows, macOS, Linux).

---

## 🚀 Installation

### Option 1: Download Desktop App (Recommended)

Go to the **[Releases](https://github.com/meet-the-1337/AtlasWatchtower/releases)** page and download the installer for your OS:

| Platform | File | Size |
|---|---|---|
| 🪟 Windows | `AtlasWatchtower_x.x.x_x64-setup.exe` | ~8 MB |
| 🍎 macOS (Apple Silicon) | `AtlasWatchtower_x.x.x_aarch64.dmg` | ~10 MB |
| 🍎 macOS (Intel) | `AtlasWatchtower_x.x.x_x64.dmg` | ~10 MB |
| 🐧 Linux (Debian/Ubuntu) | `AtlasWatchtower_x.x.x_amd64.deb` | ~8 MB |
| 🐧 Linux (AppImage) | `AtlasWatchtower_x.x.x_amd64.AppImage` | ~10 MB |

> **Note:** On macOS, right-click → Open on first launch (app is unsigned unless you have Apple Developer credentials).

### Option 2: Run from Source (Developers)

**Prerequisites:** Node.js 20+ and Git.

```bash
# 1. Clone the repository
git clone https://github.com/meet-the-1337/AtlasWatchtower.git
cd AtlasWatchtower

# 2. Install dependencies
npm install

# 3. (Optional) Add API keys for richer data
cp .env.example .env
# Edit .env and paste your keys — all are optional

# 4. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Option 3: Build Desktop App Locally

Requires [Rust](https://rustup.rs/) in addition to Node.js.

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Linux only — install system dependencies
sudo apt install libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf

# Build and run in dev mode
npm run desktop:dev

# Build production installer
npm run desktop:build:full
```

---

## ✨ Features

### 🗺️ Interactive 3D Map (35+ Layers)

| Layer | Source | Description |
|---|---|---|
| Earthquakes | USGS | Live seismic events with magnitude rings |
| Wildfires | NASA FIRMS | Satellite fire detection hotspots |
| Military Flights | OpenSky/ADS-B | Real-time military aircraft positions |
| Naval Vessels | AISStream | Ship tracking with AIS data |
| Protests & Unrest | ACLED | Social unrest events worldwide |
| Armed Conflicts | ACLED + UCDP | Active conflict zones |
| Internet Outages | Cloudflare Radar | Regional internet disruptions |
| Weather Alerts | NWS | Severe weather warnings |
| Undersea Cables | Internal DB | Global submarine cable network |
| Nuclear Facilities | Internal DB | Worldwide nuclear sites |
| Military Bases | Internal DB | Global military installations |
| Cyber Threats | Internal | APT group locations |
| Oil & Gas Pipelines | Internal DB | Major pipeline routes |
| Tech HQs & Datacenters | Internal DB | 200+ AI datacenter locations |

### 📊 Dashboard Panels

- **Live News** — Real-time breaking news ticker from 100+ RSS sources
- **AI Insights** — Automated intelligence synthesis with threat scoring
- **Markets** — Stock quotes, crypto, ETF flows, stablecoins
- **Predictions** — Polymarket prediction market odds
- **Country Instability Index** — AI-computed risk scores for 50+ countries
- **Strategic Posture** — Military theater analysis
- **Economic Indicators** — FRED data, oil analytics
- **Population Exposure** — Impact analysis for natural disasters

### 🧠 AI & ML Features

- Client-side ML inference (ONNX Runtime) for threat classification
- Server-side LLM summarization (Groq/OpenRouter)
- News event clustering with Jaccard similarity
- Cross-source signal correlation and anomaly detection
- H3 hexagonal geo-convergence detection

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────┐
│                    USER BROWSER                       │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌─────────────────┐   │
│  │ main.ts  │→ │  App.ts  │→ │  40+ UI Panels  │   │
│  │ (entry)  │  │ (brain)  │  │  (news, market,  │   │
│  └──────────┘  └────┬─────┘  │   status, etc.)  │   │
│                     │        └─────────────────┘   │
│                     ▼                               │
│         ┌──────────────────────┐                    │
│         │  DeckGLMap.ts        │ ◄── WebGL Renderer │
│         │  (deck.gl + MapLibre)│     35+ layers     │
│         └──────────┬───────────┘                    │
│                    │                                │
│  ┌─────────┐  ┌───┴────┐  ┌───────────┐           │
│  │Analysis │  │Cluster │  │ ML Worker │           │
│  │ Worker  │  │ Worker │  │ (ONNX)   │           │
│  └─────────┘  └────────┘  └───────────┘           │
│       Web Workers (off main thread)                 │
└────────────────────┬─────────────────────────────────┘
                     │ HTTP / WebSocket
                     ▼
┌──────────────────────────────────────────────────────┐
│              VERCEL SERVERLESS BACKEND                │
│                                                      │
│  server/seismology/  → USGS earthquakes             │
│  server/wildfire/    → NASA FIRMS fires             │
│  server/military/    → OpenSky flights              │
│  server/conflict/    → ACLED/UCDP conflicts         │
│  server/market/      → Finnhub stocks               │
│  server/news/        → AI summarization             │
│  server/climate/     → Open-Meteo anomalies         │
│  server/maritime/    → AIS vessel tracking          │
│  ... (15 service domains)                           │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│              EXTERNAL DATA SOURCES                    │
│                                                      │
│  USGS • NASA • OpenSky • ACLED • UCDP • UNHCR      │
│  Finnhub • Polymarket • Cloudflare • FRED • NWS     │
│  AISStream • Groq • OpenRouter • GDELT • EIA        │
└──────────────────────────────────────────────────────┘
```

### Data Flow

```
External APIs → server/ (Vercel Functions) → src/services/ → App.ts → Components + Map
                                                  ↓
                                            Web Workers
                                     (clustering, ML, analysis)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Language** | TypeScript 5.7 |
| **Bundler** | Vite 6 |
| **Map Engine** | deck.gl 9 + MapLibre GL 5 |
| **Backend** | Vercel Serverless Functions |
| **API Protocol** | Protobuf (sebuf) |
| **Desktop** | Tauri v2 (Rust) |
| **ML Runtime** | ONNX Runtime Web |
| **Visualization** | D3.js 7 |
| **Clustering** | Supercluster (Web Worker) |
| **Spatial Index** | H3 Hexagons |
| **i18n** | i18next (12 languages) |
| **Error Tracking** | Sentry |
| **Analytics** | PostHog |

---

## ⚙️ Configuration

### Environment Variables

All API keys are **optional**. The app works without any keys — features simply degrade gracefully.

```bash
cp .env.example .env
```

| Variable | Service | Free Tier |
|---|---|---|
| `GROQ_API_KEY` | AI Summarization | 14,400 req/day |
| `FINNHUB_API_KEY` | Stock Market Data | 60 req/min |
| `VITE_MAPTILER_KEY` | High-detail Map Tiles | 100k loads/mo |
| `CLOUDFLARE_API_TOKEN` | Internet Outage Data | Free |
| `EIA_API_KEY` | US Energy Data | Free |
| `FRED_API_KEY` | Economic Indicators | Free |
| `AISSTREAM_API_KEY` | Ship AIS Tracking | Free |
| `OPENSKY_CLIENT_ID` | Aircraft Tracking | Free |

See [`.env.example`](.env.example) for the full list with registration links.

### Site Variants

```bash
npm run dev              # Full variant (default)
npm run dev:tech         # Tech/startup focused
npm run dev:finance      # Finance/markets focused
```

---

## 📁 Project Structure

```
AtlasWatchtower/
├── src/
│   ├── main.ts                 # Entry point
│   ├── App.ts                  # Main orchestrator (4,600 lines)
│   ├── components/             # 38 UI components
│   │   ├── DeckGLMap.ts        # WebGL map engine (4,100 lines)
│   │   ├── MapContainer.ts     # Map wrapper
│   │   ├── Panel.ts            # Base panel class
│   │   ├── NewsPanel.ts        # News display
│   │   ├── MarketPanel.ts      # Stock data
│   │   └── ...                 # 33 more panels
│   ├── services/               # 50+ data fetching modules
│   │   ├── earthquakes.ts      # USGS API
│   │   ├── military-flights.ts # OpenSky API
│   │   ├── wildfires/          # NASA FIRMS
│   │   ├── conflict/           # ACLED + UCDP
│   │   ├── market/             # Finnhub
│   │   └── ...
│   ├── config/                 # Static geodata + app config
│   │   ├── geo.ts              # Military bases, cables, hotspots
│   │   ├── feeds.ts            # 100+ RSS feed URLs
│   │   ├── ai-datacenters.ts   # 200+ datacenter locations
│   │   └── variants/           # full / tech / finance configs
│   ├── workers/                # Web Workers for heavy computation
│   │   ├── analysis.worker.ts  # News clustering
│   │   ├── clustering.worker.ts# Spatial indexing (Supercluster)
│   │   └── ml.worker.ts        # ONNX ML inference
│   ├── utils/                  # Shared utilities
│   ├── types/                  # TypeScript interfaces
│   ├── styles/                 # CSS
│   └── locales/                # 12 language translations
├── server/                     # Vercel serverless API handlers
├── proto/                      # Protobuf API definitions
├── src-tauri/                  # Tauri desktop app (Rust)
├── e2e/                        # Playwright E2E tests
├── public/                     # Static assets
├── .github/
│   ├── workflows/
│   │   ├── build-desktop.yml   # Cross-platform desktop builds
│   │   └── lint.yml            # Code quality checks
│   └── ISSUE_TEMPLATE/         # Bug report, feature request templates
├── .env.example                # Environment variable template
├── vite.config.ts              # Build configuration
├── vercel.json                 # Deployment configuration
└── package.json                # Dependencies and scripts
```

---

## 📜 Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server (port 5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run typecheck` | TypeScript type checking |
| `npm run desktop:dev` | Desktop app dev mode (requires Rust) |
| `npm run desktop:build:full` | Build desktop installer |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:data` | Run data validation tests |

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 🛡️ Security

If you discover a security vulnerability, please follow our [Security Policy](SECURITY.md). **Do not open a public issue** for security vulnerabilities.

---

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of notable changes.

---

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0** — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Built with data from: USGS, NASA FIRMS, OpenSky Network, ACLED, UCDP, UNHCR, Cloudflare Radar, Finnhub, Polymarket, FRED, NWS, GDELT, EIA, and AISStream.

---

<p align="center">
  <sub>Made with ☕ and satellite data</sub>
</p>
