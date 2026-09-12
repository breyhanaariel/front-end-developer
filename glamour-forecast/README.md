# 💄 Glamour Forecast

**Weather-Powered Beauty Discovery**

Glamour Forecast is an API-driven front-end application that combines current local weather with rule-based beauty guidance and an external beauty/skin-care product catalog.

## What It Does

- Search current weather by city or postal code
- Load live temperature, humidity, UV, wind, and condition data from Open-Meteo
- Generate beauty-prep suggestions from weather conditions
- Load beauty and skin-care products from DummyJSON
- Search products by name, brand, or tags
- Filter by product category
- Save and remove favorite products
- Persist location and favorites locally with Zustand
- Present loading, empty, and API-error states

The app does **not** claim that product data is real-time retail inventory. DummyJSON is used as an external REST data source for the portfolio experience.

## Tech Stack

- Next.js
- React
- TypeScript
- Zustand + persistence middleware
- Tailwind CSS
- Open-Meteo Weather + Geocoding APIs
- DummyJSON Products API
- Vitest
- ESLint

## Architecture

External requests are proxied through Next.js API routes:

- `/api/weather` geocodes the user's search with Open-Meteo and then loads current weather conditions.
- `/api/products` combines DummyJSON's `beauty` and `skin-care` categories and normalizes the response for the UI.

A small recommendation module converts weather measurements into transparent, testable beauty guidance rather than hiding the logic inside a component.

**No API keys or secrets are required.**

## Run Locally

From the showcase repository root:

```bash
cd glamour-forecast
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

## Deploy to Vercel

This app can be deployed directly with `glamour-forecast` as the project root. No environment variables are required.

**Live demo:** deployment pending.

## Data Sources

- [Open-Meteo](https://open-meteo.com/)
- [DummyJSON Products](https://dummyjson.com/docs/products)

## Source

[View Glamour Forecast in the showcase repository](https://github.com/breyhanaariel/front-end-developer/tree/main/glamour-forecast)
