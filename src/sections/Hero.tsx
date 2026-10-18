import { useEffect, useRef, type CSSProperties } from 'react'
import PortraitMosaic from '../components/PortraitMosaic'
import { site } from '../data/site'
import { asset } from '../lib/asset'
import { useGsap } from '../lib/motion'

const LINES = site.name.split(' ')

// Gradient is applied per letter (sized to the whole 3-line block) because background-clip:text
// on a parent breaks when children are transformed.
function letterStyle(line: number): CSSProperties {
  return {
    backgroundImage: 'linear-gradient(180deg,#f4f5f7 0%,#c9ccd3 55%,#5d6270 100%)',
    backgroundSize: `100% ${LINES.length * 100}%`,
    backgroundPosition: `0 ${(line / (LINES.length - 1)) * 100}%`,
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
  }
}

type Props = { ready?: boolean }

export default function Hero({ ready = true }: Props) {
  const root = useRef<HTMLElement>(null)
  const tl = useRef<gsap.core.Tween | null>(null)

  useGsap(root, (g) => {
    // Paused until `ready`; the from-state is only applied by JS, so no-JS / reduced motion show the final state.
    tl.current = g.from('[data-letter]', {
      yPercent: 110,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.04,
      paused: true,
    })
  })

  useEffect(() => {
    if (ready) tl.current?.play()
  }, [ready])

  return (
    <section
      ref={root}
      id="home"
      className="relative flex h-screen min-h-[34rem] flex-col justify-end overflow-hidden px-4 pb-6 sm:px-8 sm:pb-8"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[8vh] h-[70vh] -translate-x-1/2 aspect-[588/600]"
      >
        <PortraitMosaic src={asset('images/portrait-cutout.webp')} className="h-full w-full" />
      </div>

      <h1
        className="relative z-10 font-sans font-black uppercase leading-[0.85] tracking-[-0.03em] text-center"
        style={{ fontSize: 'clamp(2.5rem, min(14vw, 19vh), 14rem)' }}
      >
        <span className="sr-only">{site.name}</span>
        {LINES.map((line, li) => (
          <span key={line} aria-hidden="true" className="block overflow-hidden whitespace-nowrap py-[0.04em]">
            {line.split('').map((ch, i) => (
              <span key={i} data-letter className="inline-block" style={letterStyle(li)}>
                {ch}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div className="relative z-10 mt-8 flex flex-wrap items-end justify-between gap-4">
        <p className="text-2xl leading-none sm:text-4xl">
          <span className="font-bold">AI</span> <em className="font-serif italic">Engineer</em>
        </p>
        <div className="flex items-center gap-3">
          <a
            href={asset(site.resume)}
            download
            className="rounded-full border border-accent px-5 py-3 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            Download résumé <span aria-hidden="true">→</span>
          </a>
          <a
            href="#about"
            aria-label="Scroll to about"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
