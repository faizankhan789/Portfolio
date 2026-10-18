import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'
import { lockScroll } from '../lib/lenis'

const DESKTOP = '(min-width: 900px)'

interface Props {
  sections: { id: string; label: string }[]
}

export default function Nav({ sections }: Props) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>(sections[0]?.id ?? '')
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    // The menu only exists below 900px: growing past it must not leave the page locked.
    const mq = typeof window.matchMedia === 'function' ? window.matchMedia(DESKTOP) : null
    const onWide = (e: { matches: boolean }) => {
      if (e.matches) setOpen(false)
    }
    mq?.addEventListener?.('change', onWide)
    const unlock = lockScroll()
    return () => {
      document.removeEventListener('keydown', onKey)
      mq?.removeEventListener?.('change', onWide)
      unlock()
    }
  }, [open])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.nav ?? e.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
      // Unlinked sections (e.g. the stack marquee) declare which nav entry they belong to.
      document.querySelectorAll(`[data-nav="${s.id}"]`).forEach((n) => io.observe(n))
    }
    return () => io.disconnect()
  }, [sections])

  const linkClass = (id: string) =>
    `font-mono text-xs uppercase tracking-widest underline-offset-8 hover:text-accent ${
      active === id ? 'text-fg underline' : 'text-muted'
    }`

  return (
    <header
      data-scrolled={scrolled}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 mix-blend-normal"
    >
      {/* Separate layer: backdrop-filter on the header itself would trap the fixed mobile menu. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 border-b backdrop-blur-md transition-[opacity,background-color,border-color] duration-200 motion-reduce:transition-none ${
          scrolled ? 'border-line bg-bg/75 opacity-100' : 'border-transparent bg-transparent opacity-0'
        }`}
      />
      <a href="#home" className="relative z-[60] font-sans text-sm font-bold uppercase tracking-wider">
        {site.name}
      </a>
      <nav aria-label="Primary" className="relative z-[60] hidden gap-6 min-[900px]:flex">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={linkClass(s.id)} aria-current={active === s.id ? 'true' : undefined}>
            {s.label}
          </a>
        ))}
      </nav>
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={() => setOpen((o) => !o)}
        className="relative z-[60] font-mono text-xs uppercase tracking-widest min-[900px]:hidden"
      >
        {open ? 'Close menu' : 'Menu'}
      </button>
      <div
        id="nav-menu"
        data-testid="nav-menu"
        inert={!open}
        className={`fixed inset-0 z-50 flex flex-col items-start justify-center gap-6 bg-bg px-8 transition-opacity duration-300 min-[900px]:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => setOpen(false)}
            className="font-sans text-3xl font-bold uppercase tracking-tight"
          >
            {s.label}
          </a>
        ))}
      </div>
    </header>
  )
}
