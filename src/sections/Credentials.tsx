import { useRef } from 'react'
import MetallicHeading from '../components/MetallicHeading'
import { credentials } from '../data/credentials'
import { useGsap } from '../lib/motion'

const education = credentials.filter((c) => c.kind === 'education')
const certs = credentials.filter((c) => c.kind === 'certification')

export default function Credentials() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, (g) => {
    g.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      g.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
    })
  })

  return (
    <section ref={root} id="credentials" className="px-4 py-24 sm:px-8 sm:py-36">
      <p className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">( Learning )</p>
      <MetallicHeading text="Credentials" lines={['Credentials']} fontSize="clamp(2rem, 11vw, 12rem)" />
      <div className="mt-12 grid gap-4 sm:mt-16">
        {education.map((e) => (
          <div key={e.title} data-reveal className="rounded-2xl border border-line p-6 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Education</p>
            <h3 className="mt-3 text-2xl font-bold sm:text-4xl">{e.title}</h3>
            <p className="mt-2 font-serif text-xl italic text-accent">{e.issuer}</p>
            {e.detail && <p className="mt-3 font-mono text-sm text-muted">{e.detail}</p>}
          </div>
        ))}
      </div>
      <h3 className="mt-16 font-mono text-sm uppercase tracking-widest text-muted">Certifications</h3>
      <ul className="mt-6 border-t border-line">
        {certs.map((c) => (
          <li key={c.title} data-reveal className="border-b border-line">
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View certificate: ${c.title}`}
              className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-accent"
            >
              <span className="min-w-0">
                <span className="block text-lg font-semibold sm:text-2xl">{c.title}</span>
                <span className="block font-mono text-xs uppercase tracking-widest text-muted">{c.issuer}</span>
              </span>
              <span aria-hidden="true" className="text-2xl transition-transform group-hover:translate-x-1">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
