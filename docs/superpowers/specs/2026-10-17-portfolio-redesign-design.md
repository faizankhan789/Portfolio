# Portfolio redesign — design

Date: 2026-10-17
Owner: Muhammad Faizan Khan

## Intent

Rebuild the portfolio so it looks and moves like the reference template at
https://demo.codeandchill.store/portfolio/ (dark, oversized metallic display
type, GSAP scroll animation), while keeping all of Faizan's own content and
the existing "push to `main` → live on GitHub Pages" deploy.

The reference is a paid template ("BUY THIS TEMPLATE" button). We reproduce
the visual language and interaction patterns with our own code. We do not copy
its bundle, CSS, images, copy text or the original owner's portrait.

## Goals

- Same section rhythm, look and animation feel as the reference.
- All content from the current `index.html` carried over (hero highlights,
  expertise, experience, work/case studies, skills, credentials, contact).
- Deploys from GitHub exactly as today: push to `main`, GitHub Actions
  publishes to https://faizankhan789.github.io/Portfolio/.

## Non-goals

- No CMS, backend, contact-form server, or analytics.
- No custom domain change.
- No "Components showcase" section and no "Hello World" pixel mini-game from
  the reference — those slots are replaced by Experience and Credentials.

## Anti-goals (failure even if it "works")

- Copied assets/code from the paid template.
- Broken deploy (blank page from wrong Vite `base`, 404 on assets).
- Content lost from the current site, or Resume.pdf no longer downloadable.
- Horizontal scroll on mobile; animations that hide content when JS fails or
  when `prefers-reduced-motion` is set (current site guarantees both).

## Constraints

- Stack (owner's choice: "same as reference"): React + Vite + Tailwind CSS +
  GSAP (ScrollTrigger). Node 22 LTS in CI.
- Vite `base: '/Portfolio/'` — site is a project page, verified live at
  `https://faizankhan789.github.io/Portfolio/` (root user page returns 404).
- `.github/workflows/static.yml` becomes: checkout → setup-node → `npm ci` →
  `npm run build` → upload `dist/` → deploy-pages. Same trigger (push to
  `main` + manual dispatch), same permissions/concurrency.
- `Resume.pdf`, favicons and portrait move to `public/` so URLs stay stable.
- Keep SEO metadata: title, description, Open Graph, JSON-LD Person.
- Accessibility parity with current site: keyboard nav, mobile menu with
  `aria-expanded`, reduced-motion fallback, readable contrast.
- Verified at 320px wide with no horizontal overflow.

## Section map (reference → this site)

| # | Reference section | This site |
|---|---|---|
| 1 | Hero: huge metallic-gradient "PORTFOLIO", particle/pixel portrait on canvas, role line, nav top-right | Same treatment; portrait particles from `faizan.webp`; role "AI Engineer"; "Download résumé" button where the reference has "Buy this template" |
| 2 | Intro: large gradient "Intro" heading, paragraph that fills in word-by-word on scroll | About text + career highlights from current hero |
| 3 | Stack marquee: two rows of pill chips scrolling in opposite directions, infinite | Current Skills list |
| 4 | "What we can do": numbered rows 01–06 with arrow, expand on hover/click | Current Expertise items |
| 5 | "Selected *work*": alternating left/right cards, device-style image, number, title with italic-serif accent word, description, link buttons | Current Work / case studies |
| 6 | (Components showcase) | Experience — timeline in same visual style |
| 7 | (Hello World game) | Credentials — education + certifications |
| 8 | Footer + sticky nav | Contact details, socials, nav, © year |

## Visual language

- Near-black background, off-white text, muted grey secondary text.
- Display headings: very large, uppercase, tight leading, metallic/silver
  gradient fill; accent words in italic serif ("SELECTED *work*").
- Monospace small labels (section eyebrows, nav).
- Motion: GSAP ScrollTrigger reveals, scroll-driven text fill, marquee,
  hover states on rows/cards, smooth section transitions.

## Hero portrait effect

- Source: `assets/images/img.png` (full-body, office background).
- Background removed locally (no upload), cropped head → mid-chest.
- Rendered on canvas as a grid of small square tiles in steel-blue/grey
  tones on black, subtle shimmer, slight pointer reaction; giant name text
  overlaps the lower half like the reference.
- Static image fallback for reduced motion / no JS.

## Work lineup (from repo analysis, owner confirmed ownership)

Feature cards (alternating, large):
1. codebase-flow-video — live site https://faizankhan789.github.io/codebase-flow-video/ + promo video
2. ResQ-AI — multimodal Gemini emergency assistant; add "not medical advice" note
3. Pin Perfect (EditingToolUsingGemini) — region-locked product-photo editing, SAM + multi-model inpainting + SSIM checks
4. AI Job-Matching & Resume-Tailoring Pipeline (repo LinkedIn_autoapply, now public — link it; avoid "LinkedIn auto-apply" in title)
5. AI Document Processing System
6. Autism learning platform — live demo https://faizankhan789.github.io/Autism/

Compact list: Arabic_search (private, no link), RAG-CIM_generator (public
repo link, "in progress"), notes-app-react-native, Saudi-Number-plate-detection,
Wiseprice (FYP car price prediction site).

Car-Price-Prediction (formerly ML-Code-For-Price-Prediction) dropped by owner.

Excluded: Dallah_hospital (not owner's), ai-cybersecurity, HiveMed, Jarvis-2025
(fork), older/thin repos. Existing case-study text (documents, inspection
video, photorealistic composition) folds into Experience.

Images: use repo screenshots/posters where they exist; otherwise styled
placeholder cards, flagged for owner to supply.

## Decided by owner

- Hero giant text is the owner's name (not "PORTFOLIO"); must fit 320px
  (scale/stack lines as needed). Page h1 = name; current h1 sentence moves
  to the role line / intro.
- Work section uses real GitHub projects chosen after repo analysis;
  private repos only if owner confirms they are personal (not client/
  employer work).

- Match the reference "everything": look, animations, sections.
- Same stack as reference (React/Vite), not plain HTML.
- Must keep deploying from GitHub as today.
- Experience and Credentials replace the reference's Components and game
  sections (interpreted from owner's "yes").

## Builder's calls (assistant decisions, owner may override)

- Work on a `redesign` branch; merge to `main` (= go live) only after
  owner approves the result.
- Reference studied in the browser only (timings, layout); its source is
  marked "All rights reserved. Licensed, not sold" — not read or reused.
- Include preloader + smooth scroll like the reference; both disabled under
  `prefers-reduced-motion`, keyboard scrolling must keep working.
- Skills: marquee chips + compact grouped list so the 5 categories survive.
- Case-study pipeline diagram and metric bullets kept inside work cards;
  "Currently at NexaQuanta" moves to Intro; `production_pipeline.py` hero
  card dropped.

- GSAP over Framer Motion (reference ships GSAP).
- Particle portrait via 2D canvas sampling image pixels (no three.js unless
  needed).
- Project images: reuse any images in the current site; where none exist use
  a styled placeholder card with the project title — flagged for owner to
  supply screenshots later.
- Fonts: system sans + system monospace + one Google serif italic for accent
  words (e.g. Instrument Serif).
- Old static files (`index.html` content, `css/`, `js/`) replaced; history
  remains in git.

## Left to the builder

Component breakdown, Tailwind config, exact easing/durations, breakpoints.
