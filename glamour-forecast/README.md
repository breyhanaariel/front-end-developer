# 💄 Glamour Forecast

**Weather-Powered Beauty Discovery**

Glamour Forecast is an API-driven front-end application that combines current local weather with rule-based beauty guidance and an external beauty/skin-care product catalog.

## What It Does

- Search current weather by city or postal code
- Load live temperature, humidity, UV, wind, and condition data from WeatherAPI
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
- WeatherAPI
- DummyJSON Products API
- Vitest
- ESLint

## Architecture

External requests are proxied through Next.js API routes:

- `/api/weather` calls WeatherAPI using a server-side `WEATHERAPI_KEY`.
- `/api/products` combines DummyJSON's `beauty` and `skin-care` categories and normalizes the response for the UI.

A small recommendation module converts weather measurements into transparent, testable beauty guidance rather than hiding the logic inside a component.

## Run Locally

From the showcase repository root:

```bash
cd glamour-forecast
cp .env.example .env.local
npm install
npm run dev
```

Add your WeatherAPI key:

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
2. Set **Root Directory** to `glamour-forecast`.
3. Keep the detected framework as **Next.js**.
4. Add `WEATHERAPI_KEY` in Vercel Environment Variables.
5. Deploy.

**Live demo:** deployment pending.

## Data Sources

- [WeatherAPI](https://www.weatherapi.com/docs/)
- [DummyJSON Products](https://dummyjson.com/docs/products)

## Source

[View Glamour Forecast in the showcase repository](https://github.com/breyhanaariel/front-end-developer/tree/main/glamour-forecast)
