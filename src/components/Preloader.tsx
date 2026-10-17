import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
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
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const state = { v: 0 }
    const finish = () => {
      try {
        window.sessionStorage.setItem('preloaded', '1')
      } catch {
        /* ignore */
      }
      document.body.style.overflow = prevOverflow
      setActive(false)
      done.current()
    }
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
      tl.kill()
      document.body.style.overflow = prevOverflow
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
