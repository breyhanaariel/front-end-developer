# GitHub Copilot Instructions — Front-End Developer Portfolio

## Repository purpose
- This repository is intentionally a single showcase monorepo for Brianna Dickenson's Front-End Developer portfolio.
- Do not split `aura-ambiance`, `cosmic-cutie`, or `glamour-forecast` into separate repositories.
- Preserve existing working application behavior unless a concrete bug or requested change requires modification.
- The portfolio is positioned for full-time remote Front-End Developer roles and selected short-term freelance work.

## Portfolio microsite
- The portfolio microsite lives in `site/`.
- Refine the existing `site/index.html`; do not generate a second unrelated landing page.
- Keep the site a single scrolling page.
- Preserve the existing feminine/girly visual identity: soft pinks and purples, rounded cards, polished typography, tasteful emoji accents, and a professional recruiter-friendly presentation.
- Keep the project order: Aura & Ambiance, Cosmic Cutie, Glamour Forecast.
- Use repository-owned screenshots from `site/assets/`.
- Keep the microsite responsive and accessible. Preserve semantic HTML, visible focus states, keyboard-friendly navigation, descriptive alt text, and readable contrast.
- Avoid adding frameworks or build tooling to the microsite unless explicitly requested. Prefer static HTML/CSS/vanilla JS.
- Keep content concise and scannable for recruiters.
- Do not invent technologies, metrics, URLs, employers, clients, or functionality.

## Deployments
- GitHub Pages publishes the `site/` directory through `.github/workflows/portfolio-pages.yml`.
- The GitHub Pages URL is `https://breyhanaariel.github.io/front-end-developer/`.
- A Vercel mirror also remains live at `https://front-end-developer-github-portfolio.vercel.app`.
- Preserve both deployments.
- Do not replace or remove the three individual Vercel showcase applications:
  - `https://aura-ambiance.vercel.app`
  - `https://cosmic-cutie.vercel.app`
  - `https://glamour-forecast.vercel.app`

## Project facts
- Aura & Ambiance demonstrates e-commerce UI, commercial UX, Zustand persistence, search/filter/sort, forms, and responsive shopping flows.
- Cosmic Cutie demonstrates Redux Toolkit, Open-Meteo integration, data transformation, Chart.js, async UI states, and measured performance optimization.
- Glamour Forecast demonstrates multi-API integration, Zustand persistence, personalization, filtering, async states, and responsive UI.
- No API keys are required for the three showcase apps.
- Current documented Lighthouse production scores are 99 Performance / 92 Accessibility for each showcase app. Cosmic Cutie improved from a 77 Performance baseline to 99 after code-splitting/deferred Chart.js loading. Do not change these figures without fresh measured evidence.

## Code quality
- Existing project quality checks include ESLint, TypeScript type checking, Vitest, production builds, dependency auditing, Lighthouse, and GitHub Actions.
- When changing a showcase app, preserve its existing architecture and add or update tests when behavior changes.
- Do not add speculative features solely to make the portfolio larger.

## README
- Keep the root README recruiter-facing and visually scannable.
- Preserve the static left-side project thumbnails and their Live Site / Source links.
- Keep only one primary Work With Me section near the top unless explicitly asked otherwise.
- Project names in the accessibility/performance table should continue to link to their project-specific Lighthouse evidence.

## Change discipline
- Make the smallest change that satisfies the request.
- Avoid broad rewrites when a targeted edit is sufficient.
- Never fabricate screenshots or performance claims.
- Keep GitHub Pages, Vercel, README, and project links consistent after edits.
