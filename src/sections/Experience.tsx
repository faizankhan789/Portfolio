import { useRef } from 'react'
import MetallicHeading from '../components/MetallicHeading'
import { roles } from '../data/experience'
import { useGsap } from '../lib/motion'

export default function Experience() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, (g) => {
    g.utils.toArray<HTMLElement>('[data-role]').forEach((el) => {
      g.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  })

  return (
    <section ref={root} id="experience" className="px-4 py-24 sm:px-8 sm:py-36">
      <p className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">( Career )</p>
      <MetallicHeading text="Experience" lines={['Experience']} fontSize="clamp(2rem, 11vw, 12rem)" />
      <ol className="mt-12 border-t border-line sm:mt-16">
        {roles.map((r) => (
          <li
            key={r.company}
            data-role
            className="grid gap-4 border-b border-line py-10 md:grid-cols-[14rem_1fr] md:gap-12"
          >
            <p className="font-mono text-sm uppercase tracking-widest text-muted">{r.period}</p>
            <div className="min-w-0">
              <h3 className="text-2xl font-bold sm:text-4xl">{r.company}</h3>
              <p className="mt-1 font-serif text-xl italic text-accent">{r.title}</p>
              <p className="mt-4 max-w-2xl text-base text-muted">{r.summary}</p>
              {r.engagements && (
                <ul className="mt-8 border-t border-line">
                  {r.engagements.map((e) => (
                    <li key={e.client + e.title} data-engagement className="border-b border-line py-5">
                      <p className="font-mono text-xs uppercase tracking-widest text-muted">{e.client}</p>
                      <h4 className="mt-1 text-lg font-semibold">{e.title}</h4>
                      <p className="mt-2 max-w-2xl text-sm text-muted">{e.summary}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
