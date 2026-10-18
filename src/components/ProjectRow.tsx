import type { Project } from '../data/types'

export default function ProjectRow({ project: p }: { project: Project }) {
  return (
    <li
      data-row={p.slug}
      className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line py-5 sm:py-6"
    >
      <h4 className="min-w-0 flex-1 basis-48 text-lg font-bold uppercase tracking-tight sm:text-2xl">
        {p.title}
        {p.badge && (
          <span className="ml-3 rounded-full border border-accent px-2 py-0.5 align-middle font-mono text-[0.65rem] font-normal normal-case tracking-normal text-accent">
            {p.badge}
          </span>
        )}
      </h4>
      <p className="font-mono text-xs text-muted sm:max-w-[40%]">{p.stack.join(' · ')}</p>
      {p.repo ? (
        <a
          href={p.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub: ${p.title}`}
          className="text-sm font-semibold transition-colors hover:text-accent"
        >
          GitHub ↗
        </a>
      ) : (
        <span className="font-mono text-xs text-muted">Private</span>
      )}
    </li>
  )
}
