import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type Setup = (g: typeof gsap, st: typeof ScrollTrigger) => void

/** Run `setup` inside a gsap.context scoped to `scope`; reverted on unmount. No-op under reduced motion. */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: Setup): void {
  useEffect(() => {
    if (prefersReducedMotion()) return
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => setup(gsap, ScrollTrigger), scope.current ?? undefined)
    return () => ctx.revert()
    // setup is intentionally run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/** Recompute ScrollTrigger start/end positions after a layout change. No-op under reduced motion. */
export function refreshScrollTriggers(): void {
  if (prefersReducedMotion()) return
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.refresh()
}
