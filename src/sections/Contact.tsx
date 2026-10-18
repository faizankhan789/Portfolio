import { useRef } from 'react'
import MetallicHeading from '../components/MetallicHeading'
import { site } from '../data/site'
import { useGsap } from '../lib/motion'

const pill =
  'rounded-full border border-fg/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-fg'

export default function Contact() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, (g) => {
    g.from('[data-contact]', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
    })
  })

  return (
    <section ref={root} id="contact" className="px-4 py-24 sm:px-8 sm:py-36">
      <p className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">( Contact )</p>
      <MetallicHeading text="Let's build" lines={["Let's"]} accent="build" />
      <div className="mt-12 sm:mt-16">
        <a
          data-contact
          href={`mailto:${site.email}`}
          className="block break-all text-xl font-bold underline decoration-line underline-offset-8 transition-colors hover:text-accent hover:decoration-accent sm:text-5xl"
        >
          {site.email}
        </a>
        <p data-contact className="mt-6 font-mono text-sm tracking-widest text-muted">
          <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-fg">
            {site.phone}
          </a>
        </p>
        <div data-contact className="mt-10 flex flex-wrap gap-3">
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={pill}>
            GitHub ↗
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={pill}>
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  )
}
