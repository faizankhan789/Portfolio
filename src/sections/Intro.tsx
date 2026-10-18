import { useRef } from 'react'
import MetallicHeading from '../components/MetallicHeading'
import { site } from '../data/site'
import { useGsap } from '../lib/motion'

const WORDS = site.about.split(/\s+/)

export default function Intro() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, (g) => {
    g.from('[data-word]', {
      color: '#3a3a3f',
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: { trigger: '[data-about]', start: 'top 80%', end: 'bottom 55%', scrub: true },
    })
  })

  return (
    <section ref={root} id="about" className="px-4 py-24 sm:px-8 sm:py-36">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">{site.specialties}</p>
      <MetallicHeading text="Intro" lines={['Intro']} />
      <div data-about className="mt-12 rounded-3xl border border-line bg-[#0f0f11] p-6 sm:p-12">
        <p className="mb-8 font-serif text-2xl italic leading-snug text-accent sm:text-3xl">{site.tagline}</p>
        <p className="text-2xl font-medium leading-snug sm:text-4xl lg:text-5xl">
          {WORDS.map((w, i) => (
            <span key={i}>
              <span data-word>{w}</span>
              {i < WORDS.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.15em] text-accent sm:text-sm">{site.current}</p>
        <dl className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
          {site.highlights.map((h) => (
            <div key={h.label}>
              <dt className="sr-only">{h.label}</dt>
              <dd className="text-3xl font-black tracking-tight sm:text-4xl">{h.value}</dd>
              <dd className="mt-2 font-mono text-xs uppercase tracking-wider text-muted" aria-hidden="true">
                {h.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
