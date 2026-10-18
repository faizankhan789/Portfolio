import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { sections } from '../lib/sections'

export default function Footer() {
  // Server and first client render agree on the build year (no hydration mismatch); the effect
  // then corrects it if the visitor's clock is in a later year.
  const [year, setYear] = useState(__BUILD_YEAR__)
  useEffect(() => setYear(new Date().getFullYear()), [])
  return (
    <footer className="border-t border-line px-5 py-10 font-mono text-xs uppercase tracking-widest text-muted">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="hover:text-fg">
              {s.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-5">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-fg">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
