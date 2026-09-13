# 🎀 Brianna Dickenson 🎀

## **Front-End Developer | React · Next.js · TypeScript**

🕓 **Seeking Full Time Remote Position**  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brianna-dickenson-9555515b) | 💌 **Available For Freelance** [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:breyhanadickenson@gmail.com?subject=Interested%20in%20Working%20With%20You)

I build responsive, accessible front-end experiences with a focus on polished UI, clear state management, API-driven features, maintainable component architecture, and measurable production quality.

---

## 🧠 Core Stack

**Languages & Web:** HTML5 · CSS3 · JavaScript · TypeScript  
**Front End:** React · Next.js · Tailwind CSS  
**State:** Redux Toolkit · Zustand  
**Data & UI:** REST APIs · Chart.js · responsive design · accessibility · form validation  
**Quality:** ESLint · TypeScript type checking · Vitest · Lighthouse · GitHub Actions

---

## 🌷 Explore My Work

### 🌿 Aura & Ambiance — E-Commerce Storefront

A self-care retail experience focused on the complete buyer journey: product discovery, persistent cart state, quantity management, product details, and a validated simulated checkout.

**Demonstrates:** 
- Commercial UI/UX
- Zustand Persistence
- Search/Filter/Sort
- Form Validation
- Responsive Shopping Flows

**Stack:** Next.js · React · TypeScript · Zustand · Tailwind CSS · Vitest

[🌐 Live Site](https://aura-ambiance.vercel.app)  · [📁 Source](./aura-ambiance)

![Aura & Ambiance live desktop preview](https://api.microlink.io?url=https%3A%2F%2Faura-ambiance.vercel.app&screenshot=true&meta=false&embed=screenshot.url)

---

### 🪐 Cosmic Cutie — Lunar Data Dashboard

An interactive astronomy dashboard backed by Open-Meteo. Users can search a location and explore moon phase, illumination, moonrise/moonset, and sunrise/sunset data over 7- or 14-day ranges.

**Demonstrates:** 
- Asynchronous Redux State
- External API Integration
- Data Transformation
- Chart.js Visualization
- Loading/Error States
- Responsive Dashboard Design
- Measured Performance Optimization

**Stack:** Next.js · React · TypeScript · Redux Toolkit · Chart.js · Tailwind CSS · Vitest

[🌐 Live Site](https://cosmic-cutie.vercel.app) · [📁 Source](./cosmic-cutie)

![Cosmic Cutie live desktop preview](https://api.microlink.io?url=https%3A%2F%2Fcosmic-cutie.vercel.app&screenshot=true&meta=false&embed=screenshot.url)

---

### 💄 Glamour Forecast — Weather-Powered Beauty Discovery

A beauty discovery interface that combines current Open-Meteo conditions with rule-based beauty guidance and live beauty/skin-care product data from DummyJSON. Users can search and filter products and persist favorites locally.

**Demonstrates:**
- Multi-API Integration
- Server-Side API Proxying
- Zustand Persistence
- Personalization Logic
- Filtering
- Error Handling
- Responsive UI.

**Stack:** Next.js · React · TypeScript · Zustand · Tailwind CSS · Vitest

[🌐 Live Site](https://glamour-forecast.vercel.app) · [📁 Source](./glamour-forecast)

![Glamour Forecast live desktop preview](https://api.microlink.io?url=https%3A%2F%2Fglamour-forecast.vercel.app&screenshot=true&meta=false&embed=screenshot.url)

---

## ♿ Accessibility & Performance Evidence

Accessibility and performance are documented with implementation evidence and repeatable audits rather than listed only as skills.

| Project | Lighthouse Performance | Lighthouse Accessibility |
| --- | ---: | ---: |
| Aura & Ambiance | **99 / 100** | **92 / 100** |
| Cosmic Cutie | **99 / 100** | **92 / 100** |
| Glamour Forecast | **99 / 100** | **92 / 100** |

Scores were measured against the live Vercel deployments on **September 12, 2026** using Lighthouse in GitHub Actions. Cosmic Cutie originally measured **77 / 100** performance; after code-splitting Chart.js and deferring the visualization bundle until the chart section approaches the viewport, its live deployment now measures **99 / 100** performance. Lighthouse scores can vary slightly between runs and environments.

Each project README documents its responsive behavior, accessible interaction patterns, loading/empty/error handling where applicable, automated quality checks, and individual Lighthouse evidence.

[View the deployed-app Lighthouse workflow](https://github.com/breyhanaariel/front-end-developer/actions/workflows/lighthouse.yml) · [View Cosmic Cutie performance validation](https://github.com/breyhanaariel/front-end-developer/actions/workflows/cosmic-performance.yml)

---

## 🛠 Running a Project Locally

Clone the showcase once, then choose the application you want to run:

```bash
git clone https://github.com/breyhanaariel/front-end-developer.git
cd front-end-developer/aura-ambiance
npm install
npm run dev
```

All three showcase apps run without API keys or private environment variables.

---

## ✅ Quality Checks

Every showcase project exposes the same quality commands:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

GitHub Actions runs production dependency auditing, linting, type checking, tests, production builds, and repeatable Lighthouse audits.
