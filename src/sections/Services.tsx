import { useEffect, useRef, useState } from 'react'
import MetallicHeading from '../components/MetallicHeading'
import { services } from '../data/services'
import { refreshScrollTriggers, useGsap } from '../lib/motion'

export default function Services() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  // Prerender (and no-JS) shows every panel; the accordion only takes over after hydration.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  // Opening/closing changes page height: re-measure triggers for everything below.
  useEffect(() => {
    if (mounted) refreshScrollTriggers()
  }, [mounted, open])

  useGsap(root, (g) => {
    g.utils.toArray<HTMLElement>('[data-row]').forEach((row) => {
      g.from(row, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 90%', once: true },
      })
    })
  })

  return (
    <section ref={root} id="services" className="px-4 py-24 sm:px-8 sm:py-36">
      <MetallicHeading text="What I can do" lines={['What I', 'can do']} className="text-right" />
      <ul className="mt-16 border-t border-line">
        {services.map((s, i) => {
          const isOpen = !mounted || open === i
          const num = String(i + 1).padStart(2, '0')
          return (
            <li key={s.title} data-row className="border-b border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`service-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 py-6 text-left sm:gap-10 sm:py-8"
                >
                  <span className="font-mono text-xs text-muted sm:text-sm">{num}</span>
                  <span className="flex-1 text-xl font-bold uppercase tracking-tight sm:text-4xl">{s.title}</span>
                  <span
                    aria-hidden="true"
                    className={`text-2xl transition-transform duration-300 sm:text-4xl ${isOpen ? 'rotate-[-90deg]' : ''}`}
                  >
                    ↘
                  </span>
                </button>
              </h3>
              <div id={`service-${i}`} hidden={!isOpen}>
                <p className="max-w-2xl pb-8 text-base text-muted sm:ml-[4.5rem] sm:text-lg">{s.summary}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
