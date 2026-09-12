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

**No API keys or secrets are required.**

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
