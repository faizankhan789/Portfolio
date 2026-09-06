# Muhammad Faizan Khan — AI Engineering Portfolio

A responsive static portfolio centered on production AI engineering: LLM/VLM
pipelines, computer vision, agentic RAG, generative imaging, and MLOps.

## Portfolio sections

1. Hero and measurable career highlights
2. AI engineering expertise
3. Work experience and client engagements
4. Production case studies and public projects
5. Technical stack
6. Education and certifications
7. Contact

## Technology

- Semantic HTML5
- Modern CSS Grid, Flexbox, custom properties, and responsive breakpoints
- Dependency-free JavaScript for navigation, scroll state, and progressive reveals
- Inline SVG icons
- WebP portrait with PNG fallback
- JSON-LD person metadata and Open Graph metadata

## Run locally

From this directory:

~~~bash
python3 -m http.server 4173
~~~

Then open http://127.0.0.1:4173.

## Accessibility and performance

- Skip link, semantic landmarks, keyboard-visible focus, and unique link labels
- Accessible mobile navigation with focus management and Escape-to-close
- Native anchor navigation and shareable URL hashes
- prefers-reduced-motion support
- Content remains available if JavaScript is disabled
- Scroll work is throttled with requestAnimationFrame
- The optimized WebP portrait is approximately 38 KB

## Content source

Portfolio claims, dates, skills, education, and certification links are aligned
with the updated ../master_resume.tex and ../master_resume.pdf.

Resume.pdf is the downloadable copy served by the portfolio.

## Deploy

The directory has no build step and can be deployed directly to GitHub Pages,
Netlify, Vercel, AWS S3/CloudFront, or any static host.
