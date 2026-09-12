# 💄 Glamour Forecast

**Weather-Powered Beauty Discovery**

Glamour Forecast is an API-driven front-end application that combines current local weather with rule-based beauty guidance and an external beauty/skin-care product catalog.

[🌐 **Open Live Site**](https://glamour-forecast.vercel.app)

## Live Preview

<p>
  <img src="https://api.microlink.io?url=https%3A%2F%2Fglamour-forecast.vercel.app&amp;screenshot=true&amp;meta=false&amp;embed=screenshot.url" alt="Glamour Forecast desktop experience" width="700" />
  <img src="https://api.microlink.io?url=https%3A%2F%2Fglamour-forecast.vercel.app&amp;screenshot=true&amp;meta=false&amp;embed=screenshot.url&amp;device=iPhone%2011" alt="Glamour Forecast mobile experience" width="220" />
</p>

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

## Deployment

**Production:** https://glamour-forecast.vercel.app  
**Platform:** Vercel  
**Environment variables:** none required

## Data Sources

- [Open-Meteo](https://open-meteo.com/)
- [DummyJSON Products](https://dummyjson.com/docs/products)

## Source

[View Glamour Forecast in the showcase repository](https://github.com/breyhanaariel/front-end-developer/tree/main/glamour-forecast)
