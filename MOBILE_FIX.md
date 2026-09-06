# Mobile implementation

The current portfolio uses a single-column layout below 680px, an accessible
full-screen navigation menu below 900px, and progressive enhancement for motion.

## Current safeguards

- Content is visible without JavaScript.
- Reduced-motion preferences disable non-essential animation.
- The menu is a native button with aria-expanded and aria-controls.
- Escape closes the menu and returns focus to the toggle.
- Closed mobile navigation is removed from the focus order with inert.
- Project, case-study, experience, skill, and credential layouts collapse cleanly.
- Buttons use full-width mobile layouts and touch-friendly sizing.
- The portrait uses a 38 KB WebP source with PNG fallback.

## Verified viewport

Playwright testing at 320px confirmed:

- viewport width: 320px
- document scroll width: 320px
- no horizontal overflow

Visual screenshots are stored under output/playwright.
