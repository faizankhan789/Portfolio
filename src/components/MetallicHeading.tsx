import type { CSSProperties } from 'react'

function letterStyle(line: number, total: number): CSSProperties {
  return {
    backgroundImage: 'linear-gradient(180deg,#f4f5f7 0%,#c9ccd3 55%,#5d6270 100%)',
    backgroundSize: `100% ${total * 100}%`,
    backgroundPosition: `0 ${total > 1 ? (line / (total - 1)) * 100 : 0}%`,
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
  }
}

type Props = { text: string; lines: string[]; className?: string; lineClassName?: string; id?: string; accent?: string }

/** h2 whose accessible name is `text`; visual `lines` are metallic per-letter gradients. */
export default function MetallicHeading({ text, lines, className = '', lineClassName = '', id, accent }: Props) {
  return (
    <h2
      id={id}
      className={`font-sans font-black uppercase leading-[0.85] tracking-[-0.03em] ${className}`}
      style={{ fontSize: 'clamp(3rem, 13vw, 12rem)' }}
    >
      <span className="sr-only">{text}</span>
      {lines.map((line, li) => (
        <span key={line} aria-hidden="true" className={`block whitespace-nowrap py-[0.04em] ${lineClassName}`}>
          {line.split('').map((ch, i) => (
            <span key={i} className="inline-block" style={letterStyle(li, lines.length)}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </span>
      ))}
      {accent && (
        <span aria-hidden="true" className="block py-[0.04em] font-serif font-normal normal-case italic text-accent">
          {accent}
        </span>
      )}
    </h2>
  )
}
