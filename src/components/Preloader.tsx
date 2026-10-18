import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { lockScroll } from '../lib/lenis'
import { prefersReducedMotion } from '../lib/motion'

function alreadyPreloaded(): boolean {
  try {
    return !!window.sessionStorage.getItem('preloaded')
  } catch {
    return false
  }
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [active, setActive] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    if (prefersReducedMotion() || alreadyPreloaded()) {
      done.current()
      return
    }
    setActive(true)
  }, [])

  useEffect(() => {
    if (!active) return
    const unlock = lockScroll()
    const state = { v: 0 }
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      window.clearTimeout(failsafe)
      try {
        window.sessionStorage.setItem('preloaded', '1')
      } catch {
        /* ignore */
      }
      unlock()
      setActive(false)
      done.current()
    }
    const failsafe = window.setTimeout(finish, 3500)
    const tl = gsap.timeline({ onComplete: finish })
    tl.to(state, {
      v: 100,
      duration: 1.2,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (counter.current) counter.current.textContent = String(Math.round(state.v))
      },
    }).to(root.current, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' })
    return () => {
      window.clearTimeout(failsafe)
      tl.kill()
      unlock()
    }
  }, [active])

  if (!active) return null
  return (
    <div
      ref={root}
      data-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-end justify-end bg-black p-6 font-mono text-fg"
    >
      <span className="text-6xl tabular-nums sm:text-8xl">
        <span ref={counter}>0</span>
      </span>
    </div>
  )
}
