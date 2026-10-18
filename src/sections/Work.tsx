import { useRef } from 'react'
import MetallicHeading from '../components/MetallicHeading'
import ProjectCard from '../components/ProjectCard'
import ProjectRow from '../components/ProjectRow'
import { projects } from '../data/projects'
import { site } from '../data/site'
import { asset } from '../lib/asset'
import { useGsap } from '../lib/motion'

const features = projects.filter((p) => p.tier === 'feature')
const more = projects.filter((p) => p.tier === 'list')

export default function Work() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, (g) => {
    g.utils.toArray<HTMLElement>('[data-card]').forEach((card) => {
      const text = card.querySelector('[data-text]')
      if (text) {
        g.from(text, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 80%', once: true },
        })
      }
      const par = card.querySelector('[data-parallax]')
      if (par) {
        g.fromTo(
          par,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      }
    })
    g.utils.toArray<HTMLElement>('[data-row]').forEach((row) => {
      g.from(row, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 92%', once: true },
      })
    })
  })

  return (
    <section ref={root} id="work" className="px-4 py-24 sm:px-8 sm:py-36">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <MetallicHeading text="Selected work" lines={['Selected']} accent="work" />
        <div className="max-w-sm">
          <p className="text-base text-muted">
            A selection of AI systems I have built, from multimodal assistants to document pipelines.
          </p>
          <a
            href={asset(site.resume)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full border border-fg/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-fg"
          >
            Résumé ↗
          </a>
        </div>
      </div>
      <div className="mt-8 sm:mt-12">
        {features.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
      <h3 className="mt-16 font-mono text-sm uppercase tracking-widest text-muted">More projects</h3>
      <ul className="mt-6 border-t border-line">
        {more.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </ul>
    </section>
  )
}
