import type Lenis from 'lenis'

let instance: Lenis | null = null
let locks = 0
let savedOverflow = ''

/** The shared Lenis instance, or null (not mounted yet, or reduced motion). */
export function getLenis(): Lenis | null {
  return instance
}

/** Register (or clear) the shared Lenis instance; a new instance starts stopped if a lock is held. */
export function setLenis(lenis: Lenis | null): void {
  instance = lenis
  if (lenis && locks > 0) lenis.stop()
}

/**
 * Freeze page scrolling: stops Lenis (which ignores body overflow) and sets body overflow hidden
 * (the only lock when Lenis is absent, e.g. reduced motion). Returns an idempotent release.
 * Nested locks are counted; scrolling resumes when the last one is released.
 */
export function lockScroll(): () => void {
  if (locks++ === 0) {
    savedOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  instance?.stop()
  let released = false
  return () => {
    if (released) return
    released = true
    if (--locks > 0) return
    document.body.style.overflow = savedOverflow
    instance?.start()
  }
}
