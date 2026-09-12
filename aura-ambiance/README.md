# 🌿 Aura & Ambiance

**Self-Care E-Commerce Front-End**

Aura & Ambiance is a polished storefront prototype built to demonstrate a realistic front-end retail journey without pretending to provide a production payment backend.

[🌐 **Open Live Site**](https://aura-ambiance.vercel.app)

## Live Preview

<p>
  <img src="https://api.microlink.io?url=https%3A%2F%2Faura-ambiance.vercel.app&amp;screenshot=true&amp;meta=false&amp;embed=screenshot.url" alt="Aura & Ambiance desktop storefront" width="700" />
  <img src="https://api.microlink.io?url=https%3A%2F%2Faura-ambiance.vercel.app&amp;screenshot=true&amp;meta=false&amp;embed=screenshot.url&amp;device=iPhone%2011" alt="Aura & Ambiance mobile storefront" width="220" />
</p>

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

## Quality & Performance

- Responsive storefront layouts are presented across desktop and mobile breakpoints.
- Checkout uses labeled form controls, validation feedback, and native interactive elements.
- Product imagery includes descriptive alternative text for assistive technology.
- Empty-cart and validation states are handled explicitly instead of leaving dead-end UI.
- Production quality is checked with ESLint, TypeScript, Vitest, and a Next.js production build in GitHub Actions.
- Lighthouse is run against the deployed Vercel application through a repeatable GitHub Actions workflow.

### Lighthouse production baseline

| Audit | Score |
| --- | ---: |
| Performance | **99 / 100** |
| Accessibility | **92 / 100** |

Measured **September 12, 2026** with Lighthouse in GitHub Actions against `https://aura-ambiance.vercel.app`. Lighthouse scores can vary slightly between runs and environments.

[View the Lighthouse workflow](https://github.com/breyhanaariel/front-end-developer/actions/workflows/lighthouse.yml)

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

## Deployment

**Production:** https://aura-ambiance.vercel.app  
**Platform:** Vercel  
**Environment variables:** none required

## Source

[View Aura & Ambiance in the showcase repository](https://github.com/breyhanaariel/front-end-developer/tree/main/aura-ambiance)
