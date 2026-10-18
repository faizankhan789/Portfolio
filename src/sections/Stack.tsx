import { skillGroups } from '../data/skills'

const ALL = skillGroups.flatMap((g) => g.items)
const ROW1 = ALL.filter((_, i) => i % 2 === 0)
const ROW2 = ALL.filter((_, i) => i % 2 === 1).reverse()

function Chip({ label }: { label: string }) {
  return (
    <li className="whitespace-nowrap rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-fg sm:text-sm">
      {label}
    </li>
  )
}

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className={`marquee overflow-hidden ${reverse ? 'marquee-reverse' : ''}`}>
      <div className="marquee-track">
        <ul className="marquee-set">
          {items.map((s) => (
            <Chip key={s} label={s} />
          ))}
        </ul>
        <ul className="marquee-set" data-marquee-dup aria-hidden="true">
          {items.map((s) => (
            <Chip key={s} label={s} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Stack() {
  return (
    <section aria-label="Tech stack" className="overflow-hidden py-16 sm:py-24">
      <div className="flex flex-col gap-3">
        <Row items={ROW1} />
        <Row items={ROW2} reverse />
      </div>
      <div className="mt-16 grid gap-10 px-4 sm:px-8 md:grid-cols-2 lg:grid-cols-5">
        {skillGroups.map((g) => (
          <div key={g.name}>
            <h3 className="border-b border-line pb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">{g.name}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
