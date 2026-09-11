# 🪐 Cosmic Cutie

**Interactive Lunar Data Dashboard**

Cosmic Cutie is a responsive astronomy dashboard that turns real WeatherAPI astronomy data into an approachable, visual front-end experience.

## What It Does

- Search astronomy data by city, postal code, or supported WeatherAPI location query
- Load real moon phase and moon illumination data
- Display moonrise, moonset, sunrise, and sunset
- Switch between 7-day and 14-day ranges
- Visualize moon illumination with Chart.js
- Show a daily lunar calendar
- Handle loading and API error states through Redux Toolkit

WeatherAPI's astronomy endpoint supplies the moon and sun data. The WeatherAPI key stays server-side inside the Next.js API route.

## Tech Stack

- Next.js
- React
- TypeScript
- Redux Toolkit
- React Redux
- Chart.js + react-chartjs-2
- Tailwind CSS
- Vitest
- ESLint

## Architecture

The browser dispatches a typed Redux async thunk to the local `/api/astronomy` route. The Next.js API route reads `WEATHERAPI_KEY` server-side, requests astronomy data from WeatherAPI, normalizes the response, and returns only the fields needed by the dashboard.

This keeps API credentials out of client-side code while giving the UI predictable typed data.

## Run Locally

From the showcase repository root:

```bash
cd cosmic-cutie
cp .env.example .env.local
npm install
npm run dev
```

Add your WeatherAPI key to `.env.local`:

```env
WEATHERAPI_KEY=your_key_here
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Deploy to Vercel

1. Import `breyhanaariel/front-end-developer` into Vercel.
2. Set **Root Directory** to `cosmic-cutie`.
3. Keep the detected framework as **Next.js**.
4. Add `WEATHERAPI_KEY` in Vercel Environment Variables.
5. Deploy.

**Live demo:** deployment pending.

## Data Source

[WeatherAPI Astronomy API](https://www.weatherapi.com/docs/)

## Source

[View Cosmic Cutie in the showcase repository](https://github.com/breyhanaariel/front-end-developer/tree/main/cosmic-cutie)
