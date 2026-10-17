# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static portfolio with a React/Vite site that matches the reference template's look and motion, carries Faizan's content and new project lineup, and still deploys to GitHub Pages on push to `main`.

**Architecture:** Vite + React + TypeScript single page. All copy lives in typed data modules under `src/data/`; each page section is one component under `src/sections/`. GSAP ScrollTrigger drives motion through one hook that no-ops under reduced motion. At build time the app is pre-rendered to static HTML (then hydrated) so content shows without JS and for SEO.

**Tech Stack:** Node 22, Vite 6, React 18, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), GSAP 3 (+ScrollTrigger), Lenis (smooth scroll), Vitest + Testing Library (unit), Playwright (e2e), rembg + Pillow (one-off portrait prep, local only).

**Spec:** `docs/superpowers/specs/2026-10-17-portfolio-redesign-design.md`

## Global Constraints

- All work on branch `redesign`. **Never `git push`** (owner rule). Commit locally only.
- **Commit messages must not mention Claude** — no "Claude" anywhere, no `Co-Authored-By` trailer (owner rule).
- Vite `base: '/Portfolio/'`. Live URL: `https://faizankhan789.github.io/Portfolio/`.
- Deploy workflow keeps: trigger push to `main` + `workflow_dispatch`; permissions `contents: read, pages: write, id-token: write`; concurrency group `pages`, `cancel-in-progress: false`.
- Reference template (https://demo.codeandchill.store/portfolio/) may be viewed in a browser for layout/timing only. Never read, download or copy its JS/CSS/images/copy.
- Hero big text = "MUHAMMAD FAIZAN KHAN" (owner's name). Role line: "AI Engineer".
- Resume stays at `/Portfolio/Resume.pdf`.
- `prefers-reduced-motion: reduce` → no preloader, no Lenis, no GSAP animations; all content visible at final state.
- No horizontal overflow at 320px viewport width.
- Keep SEO: `<title>`, meta description, Open Graph, JSON-LD `Person` (port from current `index.html` `<head>`).
- External links: `target="_blank" rel="noopener noreferrer"`.
- Never include: Dallah_hospital, ai-cybersecurity, HiveMed-medicalBilling, Car-Price-Prediction, Jarvis-2025, crush-bday.
- Never use the phrase "LinkedIn auto-apply" in visible copy.
- Colour tokens: bg `#0a0a0b`, text `#ededed`, muted `#8a8a8f`, line `#1f1f22`, accent steel-blue `#8fa8d8`.
- Fonts: system sans (`-apple-system, system-ui, "Segoe UI", Roboto, sans-serif`), system mono (`ui-monospace, SFMono-Regular, Menlo, monospace`), accent italic serif "Instrument Serif" (Google Fonts, italic 400).

## Review Focus

1. **Wrong base path** — any asset/link hard-coded as `/x` instead of `import.meta.env.BASE_URL + 'x'` 404s on Pages. Test: Task 1 e2e serves `dist/` under `/Portfolio/` and asserts zero failed requests.
2. **Long name at 320px** — "MUHAMMAD FAIZAN KHAN" overflowing. Test: Task 10 e2e asserts `scrollWidth <= 320` at 320px.
3. **Reduced motion** — elements left at GSAP "from" state (opacity 0) or a preloader that never clears. Test: Task 10 e2e with `reducedMotion: 'reduce'` asserts every `section h2` is visible and opacity 1.
4. **JS disabled / JS error** — blank page. Test: Task 10 e2e with `javaScriptEnabled: false` asserts the name and all section headings are in the page.
5. **Missing project image** — broken `<img>`. Test: Task 7 unit test renders a project with `image: undefined` and asserts a placeholder with the project title, no `<img>`.

---

### Task 1: Scaffold, deploy workflow, asset move

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html` (Vite entry, replaces old), `src/main.tsx`, `src/App.tsx`, `src/styles/index.css`, `vitest.setup.ts`, `playwright.config.ts`, `e2e/base-path.spec.ts`, `.gitignore`
- Move: `Resume.pdf` → `public/Resume.pdf`; `assets/favicons/*` → `public/favicons/`; `assets/images/faizan.webp` → `public/images/faizan.webp`; `assets/images/img.png` → `source-assets/img.png` (not shipped)
- Delete: `css/`, `js/`, `MOBILE_FIX.md`, `STRUCTURE.md` (old `index.html` content: keep a copy at `source-assets/legacy-index.html` for content porting; delete in Task 10)
- Modify: `.github/workflows/static.yml`, `README.md`

**Interfaces:**
- Produces: `npm run dev | build | preview | test | e2e`; `asset(path: string): string` in `src/lib/asset.ts` returning `import.meta.env.BASE_URL + path` (no leading slash in `path`); Tailwind tokens from Global Constraints as CSS vars `--bg --fg --muted --line --accent` and Tailwind theme colours `bg fg muted line accent`; fonts `font-sans font-mono font-serif`.

- [ ] **Step 1:** Scaffold with `npm create vite@latest . -- --template react-ts` into the existing repo (keep `.git`, `.github`, `docs/`). Add deps: `gsap lenis`; dev: `tailwindcss @tailwindcss/vite vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test`. Pin exact versions in `package.json`.
- [ ] **Step 2:** `vite.config.ts`: `base: '/Portfolio/'`, plugins react + tailwind, `test: { environment: 'jsdom', setupFiles: './vitest.setup.ts' }`.
- [ ] **Step 3:** Write `e2e/base-path.spec.ts`: start `vite preview --base /Portfolio/ --port 4173` (via `playwright.config.ts` `webServer`), visit `/Portfolio/`, collect `requestfailed` + responses `>=400`; assert list empty; assert `/Portfolio/Resume.pdf` returns 200.
- [ ] **Step 4:** Run `npm run build && npx playwright test e2e/base-path.spec.ts` → expected PASS (App renders a placeholder `<h1>`).
- [ ] **Step 5:** Rewrite `.github/workflows/static.yml` deploy job steps: checkout@v4 → `actions/setup-node@v4` (`node-version: 22`, `cache: npm`) → `npm ci` → `npm run build` → configure-pages@v5 → upload-pages-artifact@v3 with `path: dist` → deploy-pages@v4. Keep trigger/permissions/concurrency unchanged. Rename `name:` to "Build and deploy to Pages".
- [ ] **Step 6:** Update `README.md`: stack, `npm install`, `npm run dev`, deploy = push to `main`.
- [ ] **Step 7:** Commit `chore: scaffold vite react site and build-based pages deploy`.

### Task 2: Content data

**Files:**
- Create: `src/data/types.ts`, `src/data/site.ts`, `src/data/experience.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/credentials.ts`, `src/data/services.ts`
- Test: `src/data/data.test.ts`

**Interfaces:**
- Produces (in `types.ts`):
  - `Project { slug: string; title: string; accentWord?: string; summary: string; stack: string[]; repo?: string; live?: string; image?: string; badge?: 'In progress'; disclaimer?: string; tier: 'feature' | 'list' }`
  - `Role { company: string; title: string; period: string; summary: string; engagements?: { client: string; title: string; summary: string }[] }`
  - `SkillGroup { name: string; items: string[] }`
  - `Service { title: string; summary: string }`
  - `Credential { kind: 'education' | 'certification'; title: string; issuer: string; detail?: string; url?: string }`
  - `site: { name: string; role: string; tagline: string; about: string; current: string; email: string; phone: string; github: string; linkedin: string; resume: string }`
  - Exports: `site`, `roles: Role[]`, `projects: Project[]`, `skillGroups: SkillGroup[]`, `services: Service[]`, `credentials: Credential[]`

- [ ] **Step 1: Write failing tests** in `data.test.ts`:
  - `projects.filter(p => p.tier === 'feature').map(p => p.slug)` equals `['codebase-flow-video','resq-ai','pin-perfect','job-matching-pipeline','ai-document-processing','autism-platform']`
  - list-tier slugs equal `['rag-cim-generator','arabic-search','notes-app','saudi-plate-detection','wiseprice']`
  - no project `repo` contains any of `Dallah_hospital, ai-cybersecurity, HiveMed, Car-Price-Prediction, Jarvis-2025, crush-bday`
  - no project text (title+summary) matches `/linkedin auto-?apply/i`
  - `arabic-search` has no `repo`; every other project has `repo` starting `https://github.com/faizankhan789/`
  - `resq-ai.disclaimer` is truthy; `rag-cim-generator.badge === 'In progress'`
  - `site.name === 'Muhammad Faizan Khan'`, `site.role === 'AI Engineer'`, `site.resume === 'Resume.pdf'`
  - `roles.map(r => r.company)` equals `['NexaQuanta','Edraak Systems','HiTech Provider','Chegg']`
  - `skillGroups.length === 5`; `credentials.filter(c => c.kind === 'certification').length === 5`
- [ ] **Step 2:** `npx vitest run src/data` → FAIL (modules missing).
- [ ] **Step 3:** Fill data. Port experience, skills (5 groups), services (current Expertise items), credentials, contact, about/tagline verbatim from `source-assets/legacy-index.html`. NexaQuanta role keeps its engagements (Altia, CitNow ×3) and absorbs the three legacy case-study blurbs into engagement summaries. Projects copy (exact):

| slug | title / accentWord | summary | repo / live |
|---|---|---|---|
| codebase-flow-video | Codebase *Flow* Video | Claude Code plugin that reads a codebase and renders an animated, code-verified explainer video of how it works end to end. | repo `codebase-flow-video`; live `https://faizankhan789.github.io/codebase-flow-video/` |
| resq-ai | ResQ *AI* | Real-time multimodal emergency assistant — voice, live camera and video triage with Gemini, generating paramedic-ready PDF reports. disclaimer: "Research prototype — not medical advice." | repo `ResQ-AI` |
| pin-perfect | Pin *Perfect* | Region-locked product-photo editing: SAM segmentation, multi-model inpainting (Flux, SDXL, Gemini, GPT-Image) and SSIM checks that prove nothing outside the edit changed. | repo `EditingToolUsingGemini` |
| job-matching-pipeline | Job *Matching* Pipeline | AI pipeline that ranks job listings against a résumé with LLMs, tailors the résumé and cover letter in LaTeX, and tracks everything in a Flask dashboard. | repo `LinkedIn_autoapply` |
| ai-document-processing | Document *Intelligence* | Fully local system for PDF classification, field extraction, semantic search and grounded Q&A. | repo `AI-Document-Processing-System` |
| autism-platform | Autism *Learning* Platform | Bilingual (English/Urdu) learning and therapy-game platform for autistic children, built with React and Django REST. | repo `Autism`; live `https://faizankhan789.github.io/Autism/` |
| rag-cim-generator | RAG CIM Generator | FastAPI ingestion and DOCX chunking pipeline for generating confidential information memorandums. | repo `RAG-CIM_generator` |
| arabic-search | Arabic Conversational Search | Hybrid Meilisearch retrieval, reranking and LangGraph answer generation with chat memory for Arabic queries. | — |
| notes-app | Notes App | Cross-platform React Native notes app with Firebase sync. | repo `notes-app-react-native` |
| saudi-plate-detection | Saudi Plate Detection | Real-time licence-plate detection, PaddleOCR reading and DeepSORT vehicle tracking with English→Arabic mapping. | repo `Saudi-Number-plate-detection` |
| wiseprice | WisePrice | Final-year project: web platform for machine-learning car price prediction. | repo `Wiseprice` |

  `image`: set only for codebase-flow-video if the repo has a poster image (download it to `public/images/projects/codebase-flow-video.jpg` via `gh api`); all others `undefined`.
- [ ] **Step 4:** `npx vitest run src/data` → PASS.
- [ ] **Step 5:** Commit `feat: typed portfolio content data`.

### Task 3: Motion foundation + shell (nav, footer, preloader, smooth scroll)

**Files:**
- Create: `src/lib/motion.ts`, `src/components/Nav.tsx`, `src/components/Footer.tsx`, `src/components/Preloader.tsx`, `src/components/SmoothScroll.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/Nav.test.tsx`, `src/lib/motion.test.ts`

**Interfaces:**
- Produces: `prefersReducedMotion(): boolean`; `useGsap(scope: RefObject<HTMLElement>, setup: (gsap, ScrollTrigger) => void): void` — runs `setup` inside `gsap.context` on mount, reverts on unmount, does nothing when reduced motion; `<Nav sections={{id: string; label: string}[]} />`; `<Preloader onDone={() => void} />`.
- Section ids used by all later tasks: `home, about, services, work, experience, credentials, contact`.

- [ ] **Step 1: Failing tests.** `motion.test.ts`: with `matchMedia` mocked to reduce, `useGsap` setup spy is not called; otherwise called once. `Nav.test.tsx`: toggle button has `aria-expanded="false"`, click → `"true"` and menu visible; `Escape` → `"false"` and focus returns to toggle; links have `href="#about"` etc.
- [ ] **Step 2:** `npx vitest run src/components/Nav.test.tsx src/lib` → FAIL.
- [ ] **Step 3:** Implement. Nav: fixed top, name left in bold uppercase sans, mono uppercase links right with active underline (IntersectionObserver), full-screen menu below 900px with `inert` when closed. Preloader: black screen with mono counter 0→100 over ~1.2s then wipes up; skipped entirely under reduced motion or when `sessionStorage.preloaded` is set (wrap in try/catch). SmoothScroll: Lenis wired to `gsap.ticker`, disabled under reduced motion; anchor clicks use `lenis.scrollTo`. Footer: © year, nav links, socials.
- [ ] **Step 4:** Tests PASS.
- [ ] **Step 5:** Commit `feat: nav, footer, preloader and smooth scroll`.

### Task 4: Portrait asset + mosaic canvas

**Files:**
- Create: `scripts/make-portrait.py`, `public/images/portrait-cutout.png` (generated, committed), `src/lib/mosaic.ts`, `src/components/PortraitMosaic.tsx`
- Test: `src/lib/mosaic.test.ts`

**Interfaces:**
- Produces: `sampleTiles(data: Uint8ClampedArray, width: number, height: number, tile: number): Tile[]` where `Tile = { x: number; y: number; lum: number }` (luminance 0–1, from the average of the tile's pixels; tiles whose average alpha < 0.5 are omitted); `tileColor(lum: number, jitter: number): string` returning an `rgb()` string between `#0e1220` (lum 0) and `#c9d6f2` (lum 1) with ±`jitter` brightness; `<PortraitMosaic src={string} className?={string} />`.

- [ ] **Step 1:** `scripts/make-portrait.py` (run with `python3 -I`): `rembg` remove background from `source-assets/img.png`, crop to head→mid-chest (top of hair to just below tie knot; box ≈ x 270–690, y 290–900 on the 928×1120 source — verify visually), resize to 600px tall, save `public/images/portrait-cutout.png`. Runs locally only. Run it; open the PNG and confirm a clean cutout.
- [ ] **Step 2: Failing tests** `mosaic.test.ts`: 4×4 fully-opaque white image with `tile=2` → 4 tiles, all `lum` 1; same but alpha 0 → 0 tiles; left half black/right half white `tile=2` → lums `[0,1,0,1]` ordered row-major; `tileColor(0,0) === 'rgb(14, 18, 32)'`, `tileColor(1,0) === 'rgb(201, 214, 242)'`.
- [ ] **Step 3:** Run → FAIL. Implement `mosaic.ts`. Run → PASS.
- [ ] **Step 4:** `PortraitMosaic`: loads image to offscreen canvas, `sampleTiles` with tile = 6 CSS px (×DPR), draws squares with 1px gap; each frame a random 3% of tiles re-jitter (shimmer); pointer within 120px pushes tiles brightness up. Under reduced motion draw once, no RAF loop. Before load / no canvas: render `<img src=portrait-cutout.png>` with CSS `filter: grayscale(1) sepia(.3) hue-rotate(180deg)`. Pause RAF when off-screen (IntersectionObserver).
- [ ] **Step 5:** Commit `feat: portrait cutout and pixel mosaic canvas`.

### Task 5: Hero

**Files:**
- Create: `src/sections/Hero.tsx`
- Test: `src/sections/Hero.test.tsx`

**Interfaces:**
- Consumes: `site`, `PortraitMosaic`, `useGsap`, `asset`.

- [ ] **Step 1: Failing test:** renders exactly one `h1` with accessible name "Muhammad Faizan Khan"; role text "AI Engineer"; link "Download résumé" with `href` ending `Resume.pdf` and `download` attribute; section `id="home"`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. Full-viewport section, mosaic centred behind; h1 stacked over 3 lines (MUHAMMAD / FAIZAN / KHAN) at `clamp(3rem, 15vw, 14rem)`, uppercase, weight 900, leading 0.85, `background: linear-gradient(180deg,#f4f5f7 0%,#c9ccd3 55%,#5d6270 100%)` clipped to text, overlapping the mosaic's lower half. Bottom-left: "AI" bold + *Engineer* in serif italic. Bottom-right: round arrow button to `#about` + bordered mono "DOWNLOAD RÉSUMÉ →" pill in accent. Entrance: letters rise from `yPercent:100` staggered 0.04s after preloader.
- [ ] **Step 4:** Run → PASS. Commit `feat: hero section`.

### Task 6: Intro, stack marquee, services

**Files:**
- Create: `src/sections/Intro.tsx`, `src/sections/Stack.tsx`, `src/sections/Services.tsx`
- Test: `src/sections/Intro.test.tsx`, `src/sections/Services.test.tsx`

**Interfaces:**
- Consumes: `site.about`, `site.current`, `skillGroups`, `services`, `useGsap`.

- [ ] **Step 1: Failing tests.** Intro: section `id="about"`, `h2` "Intro", the about paragraph split into word `<span>`s whose joined text equals `site.about`, text "Currently at NexaQuanta" present. Services: section `id="services"`, `h2` "What I can do", one row per service numbered `01`…; clicking a row toggles `aria-expanded` and reveals its summary.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. Intro: mono eyebrow "ABOUT ME", huge metallic "Intro", paragraph on dark card whose words go from `#3a3a3f` to `--fg` scrubbed by scroll. Stack: two marquee rows of pill chips (all skills, row 2 reversed), CSS keyframe loop duplicated content, paused on hover, static wrap under reduced motion; below it a compact 5-column grouped list (stacks on mobile). Services: right-aligned huge "WHAT I / CAN DO", rows with number, uppercase title, `↘` arrow rotating on open, thin `--line` dividers, row slides in on scroll.
- [ ] **Step 4:** Run → PASS. Commit `feat: intro, stack marquee and services`.

### Task 7: Selected work

**Files:**
- Create: `src/sections/Work.tsx`, `src/components/ProjectCard.tsx`, `src/components/ProjectRow.tsx`
- Test: `src/components/ProjectCard.test.tsx`, `src/sections/Work.test.tsx`

**Interfaces:**
- Consumes: `projects`, `Project`, `asset`, `useGsap`.

- [ ] **Step 1: Failing tests.** ProjectCard with `image: undefined` → no `img`, element with `data-placeholder` containing the title; with `live` → link "Live demo" `target=_blank rel="noopener noreferrer"`; with `disclaimer` → disclaimer text shown; without `repo` → no "GitHub" link. Work: section `id="work"`, 6 cards numbered `01`–`06` in data order, 5 rows in the "More projects" list, `arabic-search` row shows "Private".
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. Header "SELECTED *work*" + short intro + "Résumé ↗" pill. Cards alternate image left/right (index even → image left); image area is a dark radial-lit panel; placeholder = large outlined title + stack chips on that panel. Text block: number, uppercase title with serif-italic `accentWord`, summary, pill buttons (Live demo filled light, GitHub outlined). Card image parallax `yPercent -10→10` scrubbed. List rows: title, stack, badge, arrow link.
- [ ] **Step 4:** Run → PASS. Commit `feat: selected work cards and project list`.

### Task 8: Experience, credentials, contact

**Files:**
- Create: `src/sections/Experience.tsx`, `src/sections/Credentials.tsx`, `src/sections/Contact.tsx`
- Test: `src/sections/Experience.test.tsx`, `src/sections/Contact.test.tsx`

**Interfaces:**
- Consumes: `roles`, `credentials`, `site`.

- [ ] **Step 1: Failing tests.** Experience: `id="experience"`, 4 roles in order, NexaQuanta shows 4 engagements. Contact: `id="contact"`, `mailto:` link to `site.email`, `tel:` link, GitHub + LinkedIn links with `rel="noopener noreferrer"`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement in the same visual language: huge metallic section titles, mono eyebrows, `--line` dividers. Experience = timeline rows (period mono left, company/title/summary right, engagements as nested rows). Credentials (`id="credentials"`) = education card + certification rows with `↗` links. Contact = huge "LET'S *build*" headline, email as large underlined link, socials row.
- [ ] **Step 4:** Run → PASS. Commit `feat: experience, credentials and contact`.

### Task 9: Pre-render + SEO head

**Files:**
- Create: `src/entry-server.tsx`, `scripts/prerender.mjs`
- Modify: `index.html`, `src/main.tsx`, `package.json` (`build` = `vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs`)

**Interfaces:**
- Produces: `render(): string` from `entry-server.tsx` (`renderToString(<App />)`); `dist/index.html` containing the rendered markup inside `<div id="root">`; `main.tsx` uses `hydrateRoot`.

- [ ] **Step 1:** Port `<head>` SEO from `source-assets/legacy-index.html`: title, description, OG tags (image → `asset('images/faizan.webp')` absolute URL `https://faizankhan789.github.io/Portfolio/images/faizan.webp`), JSON-LD Person updated with new role/links, favicons from `public/favicons/`, Instrument Serif link.
- [ ] **Step 2:** Implement prerender: read `dist/index.html`, replace `<div id="root"></div>` with `<div id="root">${render()}</div>`, write back, delete `dist-ssr`. All components must render on the server: guard `window`/`matchMedia`/`canvas` behind effects.
- [ ] **Step 3:** Verify: `npm run build && grep -c "MUHAMMAD\|Muhammad Faizan Khan" dist/index.html` → ≥1; `grep -c 'id="work"' dist/index.html` → 1.
- [ ] **Step 4:** Commit `feat: build-time prerender and SEO metadata`.

### Task 10: E2E guarantees + cleanup

**Files:**
- Create: `e2e/guarantees.spec.ts`
- Delete: `source-assets/legacy-index.html`, `index.html.bak` if any

- [ ] **Step 1: Write tests** (against `vite preview` from Task 1 config):
  - 320×640 viewport: after full scroll, `document.documentElement.scrollWidth <= 320`.
  - `reducedMotion: 'reduce'`: no element `[data-preloader]` visible after load; every `section h2` visible with computed opacity `"1"`.
  - `javaScriptEnabled: false`: page contains "Muhammad Faizan Khan" and headings "Intro", "What I can do", "Selected work", "Experience", "Credentials".
  - keyboard: Tab from page top reaches the first nav link; pressing `End` scrolls to footer.
  - No console errors on load at 1280×800.
- [ ] **Step 2:** `npm run build && npx playwright test` → PASS (fix failures in owning component).
- [ ] **Step 3:** Visual pass: screenshot full page at 1280 and 390 widths into `output/playwright/`; compare against the reference in a browser for section rhythm and type scale; adjust spacing tokens only.
- [ ] **Step 4:** `npm test && npm run build` clean. Delete legacy copy. Commit `test: e2e guarantees; remove legacy files`.
- [ ] **Step 5:** Stop. Report to owner with screenshots and `npm run preview` instructions. Merge/push to `main` only on owner's explicit go-ahead.
