# CropCore — Crop Storage Dashboard

A front-end dashboard mockup for **CropCore**, a crop storage management concept designed for the mango value chain (harvest → storage → drying/processing → export).

![CropCore dashboard preview](dashboard-preview(1).png)

**Live demo:** [christelle-dehoumon.github.io/CropCore-Dashboard-Mockup](https://christelle-dehoumon.github.io/CropCore-Dashboard-Mockup/)

## Overview
CropCore helps track stored batches, monitor storage conditions, and flag risks (temperature/humidity deviations, FIFO compliance) before they cause losses. This repo contains the static front-end prototype: no backend yet, all data is mocked in `script.js`.

## Features
- **Storage capacity gauge** — visual read of used vs. available storage space
- **Temperature & humidity trends** — 24h charts (Chart.js) against target ranges
- **Batch tracking table** — quantity, temperature, humidity, and FIFO status per batch
- **Active alerts** — flags at-risk batches (e.g. temperature above target) with a detail modal and recommended action
- **Environmental sensors panel** — status of connected sensors (temperature, humidity, IoT gateway)
- **Search** — filter batches by ID, product, temperature, or humidity
- **Sidebar navigation** — Overview, Storage, Batches, Monitoring, Analytics, Alerts, Reports, Settings

## Tech Stack
- HTML5 / CSS3
- Vanilla JavaScript
- [Chart.js](https://www.chartjs.org/) (via CDN)
- Google Fonts — Inter

## Project Structure

dashboard_mockup/
├── index.html # Main dashboard markup
├── styles.css # Styling
├── script.js # Mock data, charts, navigation logic
├── logocropcore.png # Logo used in the sidebar
├── cropcore.jpeg # Additional brand asset
├── dashboard_preview(1).png # Full dashboard preview
└── assets/
└── logo.svg


## Getting Started
No build step needed — it's a static site.

1. Clone the repo
```bash
   git clone https://github.com/christelle-dehoumon/CropCore-Dashboard-Mockup.git
   cd CropCore-Dashboard-Mockup
   open index.html   # or double-click the file
```

Optional, for live reload during development:
```bash
npx live-server
```

Or check the [live demo](https://christelle-dehoumon.github.io/CropCore-Dashboard-Mockup/) directly.

## Status
Prototype / mockup stage — data displayed is hardcoded for demonstration. Next steps: connect to real sensor data (IoT gateway) and a persistence layer.

## License
MIT — free to use, modify, and distribute, with credit.

## Author
**Christelle Alvine Dehoumon**
[GitHub](https://github.com/christelle-dehoumon) · [LinkedIn](https://linkedin.com/in/christelle-dehoumon)

