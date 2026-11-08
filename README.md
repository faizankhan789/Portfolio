<h1 align="center">Muhammad Faizan Khan - AI Engineering Portfolio</h1>

<p align="center">Personal portfolio site, live at<br>
<a href="https://faizankhan789.github.io/Portfolio/"><b>faizankhan789.github.io/Portfolio</b></a></p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178c6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-v4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-motion-88ce02?style=flat-square">
  <img alt="Deploy" src="https://img.shields.io/badge/deploy-GitHub%20Pages-181717?style=flat-square&logo=github&logoColor=white">
</p>

<p align="center">
  <a href="#-stack"><b>Stack</b></a> ·
  <a href="#-develop">Develop</a> ·
  <a href="#-portrait-asset">Portrait asset</a> ·
  <a href="#-deploy">Deploy</a>
</p>

---

## 🧰 Stack

- React + TypeScript, built with Vite (base path `/Portfolio/`)
- Tailwind CSS v4
- GSAP and Lenis for motion and smooth scroll
- Vitest + Testing Library for unit tests, Playwright for end-to-end checks

## 🔁 Build pipeline

```mermaid
flowchart LR
    A[tsc -b] --> B[vite build] --> C[vite build --ssr<br/>entry-server.tsx] --> D[prerender.mjs<br/>inject HTML into dist/index.html] --> E([dist/ to GitHub Pages])
```

`npm run build` type-checks, builds the client, builds an SSR bundle, then prerenders the React tree into `dist/index.html`.

---

## 💻 Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and production build into dist/
npm run preview  # serve the production build
npm test         # unit tests
npm run e2e      # Playwright tests (run `npx playwright install chromium` once)
```

## 🖼️ Portrait asset

`public/images/portrait-cutout.webp` (the hero mosaic source) is generated from
`source-assets/img.png` with background removal that runs locally:

```bash
pip install rembg pillow numpy scipy   # numpy + scipy clean the matte
python3 -I scripts/make-portrait.py
```

## 🚀 Deploy

Deployment is automatic: push to `main` and the GitHub Actions workflow
(`.github/workflows/static.yml`) builds the site and publishes `dist/` to
GitHub Pages.

`public/Resume.pdf` is the downloadable resume, served at `/Portfolio/Resume.pdf`.
