# 🌿 Aura & Ambiance

**Self-Care E-Commerce Front-End**

Aura & Ambiance is a polished storefront prototype built to demonstrate a realistic front-end retail journey without pretending to provide a production payment backend.

## What It Does

- Browse a curated self-care product catalog
- Search products by name, description, or scent
- Filter by product category
- Sort by featured status, price, or name
- View dedicated product-detail pages
- Add products to a persistent Zustand cart
- Update quantities or remove products
- Preserve cart contents in local storage
- Complete an accessible, validated **simulated** checkout
- Display a demo order confirmation without collecting payment

## Tech Stack

- Next.js
- React
- TypeScript
- Zustand + persistence middleware
- Tailwind CSS
- Vitest
- ESLint

## Why This Project Is in the Portfolio

This project focuses on front-end work a retail or freelance client can immediately understand: product discovery, conversion-focused navigation, cart continuity, clear form states, and responsive presentation.

## Run Locally

From the showcase repository root:

```bash
cd aura-ambiance
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

This app is deployment-ready as an independent root inside the monorepo:

1. Import `breyhanaariel/front-end-developer` into Vercel.
2. Set **Root Directory** to `aura-ambiance`.
3. Keep the detected framework as **Next.js**.
4. Deploy. No environment variables are required.

**Live demo:** deployment pending.

## Source

[View Aura & Ambiance in the showcase repository](https://github.com/breyhanaariel/front-end-developer/tree/main/aura-ambiance)
