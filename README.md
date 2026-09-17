# Smart Refrigeration Monitoring System

A real-time dashboard for monitoring refrigeration units — temperature, humidity, and system status — with live hardware sensor input and an automatic simulated-data fallback so the dashboard is always demoable, even without hardware connected.

**Live demo:** [smart-refrigeration-monitoring-syst.vercel.app](https://smart-refrigeration-monitoring-syst.vercel.app)

## What It Does

- **Live monitoring dashboard** — real-time view of refrigeration unit readings (temperature, humidity, and other tracked metrics)
- **Real + simulated data modes** — pulls live readings when hardware sensors are connected; automatically falls back to realistic simulated data when no hardware is available, so the UI is never empty
- **Alerts** — flags out-of-range readings (e.g. temperature drifting outside a safe threshold) so problems are caught before spoilage or equipment damage occurs
- **Historical logs** — tracks past readings over time so trends and recurring issues are visible, not just the current snapshot

## Why It Matters

Refrigeration failures are often silent until it's too late — a door left ajar, a failing compressor, or a slow temperature drift can spoil inventory before anyone notices. This project puts a live, always-on view of unit health in front of the person who needs it, with alerting so problems surface immediately instead of being discovered after the damage is done.

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Project Structure

```
Smart-Refrigeration-Monitoring-System/
├── src/                  # React components, dashboard views, data logic
├── index.html            # App entry point
├── package.json          # Dependencies and scripts
├── vite.config.js         # Vite build configuration
├── tailwind.config.js     # Tailwind theme/config
└── postcss.config.js      # PostCSS config (used by Tailwind)
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/dhathri-kesavulu/Smart-Refrigeration-Monitoring-System.git
cd Smart-Refrigeration-Monitoring-System
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL Vite prints (typically `http://localhost:5173`) in your browser.

### Build for production

```bash
npm run build
```

## Data Modes

The dashboard works in two modes:

- **Hardware mode** — when a sensor source is connected and reachable, the dashboard displays live readings.
- **Simulated mode** — if no hardware is detected, the app generates realistic mock readings automatically, so the dashboard and alerting logic can be explored without any physical setup.

> Hardware wiring, sensor types, and connection details are project-specific — add them here once finalized (e.g. sensor model, communication protocol, expected data format).

## Roadmap

- Configurable alert thresholds per unit
- Multi-unit / multi-zone monitoring
- Export historical data (CSV)
- Push/email notifications on alert

Built as part of an IDPBL (Interdisciplinary Project Based Learning) project in second semester, as a group project.
