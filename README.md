# Muhammad Faizan Khan - AI Engineering Portfolio

Personal portfolio site, live at https://faizankhan789.github.io/Portfolio/

## Stack

- React + TypeScript, built with Vite (base path `/Portfolio/`)
- Tailwind CSS v4
- GSAP and Lenis for motion and smooth scroll
- Vitest + Testing Library for unit tests, Playwright for end-to-end checks

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and production build into dist/
npm run preview  # serve the production build
npm test         # unit tests
npm run e2e      # Playwright tests (run `npx playwright install chromium` once)
```

## Deploy

Deployment is automatic: push to `main` and the GitHub Actions workflow
(`.github/workflows/static.yml`) builds the site and publishes `dist/` to
GitHub Pages.

`public/Resume.pdf` is the downloadable resume, served at `/Portfolio/Resume.pdf`.
