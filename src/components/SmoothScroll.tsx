import { useEffect } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import { setLenis } from '../lib/lenis'
import { prefersReducedMotion } from '../lib/motion'

/** Focus the scroll target so keyboard and screen-reader users land where the page moved to. */
function focusTarget(target: HTMLElement) {
  if (target.tabIndex < 0 && !target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis()
    setLenis(lenis)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]')
      const hash = a?.getAttribute('href')
      if (!hash || hash.length < 2) return
      const target = document.getElementById(hash.slice(1))
      if (!target) return
      e.preventDefault()
      history.replaceState(null, '', hash)
      const go = () => lenis.scrollTo(target, { onComplete: () => focusTarget(target) })
      // A link inside the open mobile menu closes it, which restarts Lenis after this handler;
      // scrolling now would be dropped (stopped) or cancelled (start() resets), so wait a frame.
      if (lenis.isStopped) requestAnimationFrame(go)
      else go()
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      setLenis(null)
      lenis.destroy()
    }
  }, [])
  return null
}
