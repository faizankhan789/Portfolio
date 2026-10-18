import type { Project } from '../data/types'
import { asset } from '../lib/asset'

export function AccentTitle({ title, accentWord }: { title: string; accentWord?: string }) {
  if (!accentWord) return <>{title}</>
  const i = title.toLowerCase().indexOf(accentWord.toLowerCase())
  if (i < 0) return <>{title}</>
  return (
    <>
      {title.slice(0, i)}
      <span className="font-serif font-normal normal-case italic text-accent">{title.slice(i, i + accentWord.length)}</span>
      {title.slice(i + accentWord.length)}
    </>
  )
}

const panel =
  'relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl border border-line'
const panelBg = { backgroundImage: 'radial-gradient(ellipse at 50% 35%, #26272d 0%, #131316 55%, #0a0a0b 100%)' }

type Props = { project: Project; index: number }

export default function ProjectCard({ project: p, index }: Props) {
  const num = String(index + 1).padStart(2, '0')
  const imageLeft = index % 2 === 0
  return (
    <article
      data-card
      className="grid items-center gap-8 py-12 sm:gap-12 sm:py-20 lg:grid-cols-2 lg:gap-20"
    >
      <div className={imageLeft ? '' : 'lg:order-2'}>
        {p.image ? (
          <div className={panel} style={panelBg}>
            <img
              data-parallax
              src={asset(p.image)}
              alt={`${p.title} preview`}
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="h-full w-full scale-125 object-cover"
            />
          </div>
        ) : (
          <div data-placeholder aria-hidden="true" className={`${panel} flex-col gap-5 p-6`} style={panelBg}>
            <span
              data-parallax
              className="text-center text-3xl font-black uppercase leading-none tracking-tight text-transparent sm:text-5xl"
              style={{ WebkitTextStroke: '1.5px rgba(237,237,237,0.35)' }}
            >
              {p.title}
            </span>
            <ul className="flex flex-wrap justify-center gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div data-text className={imageLeft ? '' : 'lg:order-1'}>
        <span className="font-mono text-sm text-muted">{num}</span>
        <h3 className="mt-3 text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
          <AccentTitle title={p.title} accentWord={p.accentWord} />
        </h3>
        <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">{p.summary}</p>
        {p.image && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                {s}
              </li>
            ))}
          </ul>
        )}
        {p.disclaimer && <p className="mt-4 font-mono text-xs text-muted">{p.disclaimer}</p>}
        {(p.live || p.repo) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-80"
              >
                Live demo ↗
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-fg/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-fg"
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
