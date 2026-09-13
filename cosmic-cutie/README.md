# 🪐 Cosmic Cutie

**Interactive Lunar Data Dashboard**

Cosmic Cutie is a responsive astronomy dashboard that turns real Open-Meteo astronomy data into an approachable, visual front-end experience.

[🌐 **Open Live Site**](https://cosmic-cutie.vercel.app)

## Live Preview

<p>
  <img src="https://api.microlink.io?url=https%3A%2F%2Fcosmic-cutie.vercel.app&amp;screenshot=true&amp;meta=false&amp;embed=screenshot.url" alt="Cosmic Cutie desktop dashboard" width="700" />
  <img src="https://api.microlink.io?url=https%3A%2F%2Fcosmic-cutie.vercel.app&amp;screenshot=true&amp;meta=false&amp;embed=screenshot.url&amp;device=iPhone%2011" alt="Cosmic Cutie mobile dashboard" width="220" />
</p>

## What It Does

- Search astronomy data by city or postal code
- Load moon phase and calculated illumination from Open-Meteo's daily moon-phase data
- Display moonrise, moonset, sunrise, and sunset
- Switch between 7-day and 14-day ranges
- Visualize moon illumination with Chart.js
- Show a daily lunar calendar
- Handle loading and API error states through Redux Toolkit

Open-Meteo supplies geocoding, sun times, moonrise/moonset, and moon phase data. The application converts the moon-phase value into a readable phase name and illumination percentage for the dashboard.

## Tech Stack

- Next.js
- React
- TypeScript
- Redux Toolkit
- React Redux
- Chart.js + react-chartjs-2
- Tailwind CSS
- Open-Meteo Weather + Geocoding APIs
- Vitest
- ESLint

## Architecture

The browser dispatches a typed Redux async thunk to the local `/api/astronomy` route. The Next.js API route geocodes the requested location, loads daily astronomy data from Open-Meteo, normalizes it, and returns only the fields needed by the dashboard.

Chart.js is code-split from the initial page bundle. Summary cards and tabular astronomy data render independently, while the heavier interactive charts are dynamically imported only when their section approaches the viewport. Chart animation is disabled to reduce main-thread work during first interaction.

**No API keys or secrets are required.**

## Quality & Performance

- Responsive dashboard layouts are presented across desktop and mobile breakpoints.
- Search, range controls, loading feedback, and API-error states provide explicit interaction feedback.
- Native form controls and readable text/table output complement the chart-based visualization.
- Typed Redux state and API normalization keep asynchronous data handling predictable and maintainable.
- Chart.js is deferred with dynamic imports and IntersectionObserver so it does not block the initial experience.
- Production quality is checked with ESLint, TypeScript, Vitest, dependency auditing, and a Next.js production build in GitHub Actions.
- Lighthouse audits run against the live Vercel deployment through GitHub Actions.

### Lighthouse performance optimization

| Measurement | Performance | Accessibility |
| --- | ---: | ---: |
| Original live baseline | **77 / 100** | **92 / 100** |
| Optimized production build | **96 / 100** | **92 / 100** |
| Optimized live Vercel deployment | **99 / 100** | **92 / 100** |

The optimization moved Chart.js out of the initial JavaScript path and loads the interactive chart bundle only as users approach that section. The optimized production-build validation measured **0.8 s FCP**, **1.8 s LCP**, **210 ms Total Blocking Time**, **0 CLS**, and a **0.8 s Speed Index**. The live Vercel deployment subsequently measured **99 / 100 performance** on September 12, 2026.

Lighthouse scores can vary slightly between runs and environments.

[View the live-deployment Lighthouse workflow](https://github.com/breyhanaariel/front-end-developer/actions/workflows/lighthouse.yml) · [View the production-build performance workflow](https://github.com/breyhanaariel/front-end-developer/actions/workflows/cosmic-performance.yml)

## Run Locally

From the showcase repository root:

```bash
cd cosmic-cutie
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Deployment

**Production:** https://cosmic-cutie.vercel.app  
**Platform:** Vercel  
**Environment variables:** none required

## Data Source

[Open-Meteo](https://open-meteo.com/)

## Source

[View Cosmic Cutie in the showcase repository](https://github.com/breyhanaariel/front-end-developer/tree/main/cosmic-cutie)
