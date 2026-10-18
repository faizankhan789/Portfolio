import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'
import { containRect, sampleTiles, tileColor, type Tile } from '../lib/mosaic'

type Props = { src: string; className?: string }

const TILE_CSS_PX = 6
const POINTER_RADIUS = 120
const RESHIMMER = 0.03
const ALT = 'Portrait of Muhammad Faizan Khan'

export default function PortraitMosaic({ src, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const fallback = imgRef.current
    if (!wrap || !canvas || !fallback) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return // no canvas support (e.g. jsdom): keep fallback <img>

    let cancelled = false
    let raf = 0
    let visible = true
    let tiles: Tile[] = []
    let jitter: number[] = []
    let tilePx = TILE_CSS_PX
    let dpr = 1
    let pointer: { x: number; y: number } | null = null
    const reduced = prefersReducedMotion()
    const source = new Image()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const size = tilePx - dpr // 1 CSS px gap
      const radius = POINTER_RADIUS * dpr
      for (let i = 0; i < tiles.length; i++) {
        const t = tiles[i]
        const px = t.x * tilePx
        const py = t.y * tilePx
        let boost = 0
        if (pointer) {
          const d = Math.hypot(px + tilePx / 2 - pointer.x, py + tilePx / 2 - pointer.y)
          if (d < radius) boost = 0.35 * (1 - d / radius)
        }
        ctx.fillStyle = tileColor(t.lum, jitter[i] + boost)
        ctx.fillRect(px, py, size, size)
      }
    }

    const frame = () => {
      raf = 0
      if (cancelled || !visible) return
      const n = Math.max(1, Math.floor(tiles.length * RESHIMMER))
      for (let k = 0; k < n; k++) {
        jitter[Math.floor(Math.random() * tiles.length)] = (Math.random() - 0.5) * 0.12
      }
      draw()
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (!reduced && !raf && visible && tiles.length) raf = requestAnimationFrame(frame)
    }

    const build = () => {
      const cssW = wrap.clientWidth
      const cssH = wrap.clientHeight
      if (!cssW || !cssH || !source.naturalWidth) return
      dpr = window.devicePixelRatio || 1
      const w = Math.round(cssW * dpr)
      const h = Math.round(cssH * dpr)
      canvas.width = w
      canvas.height = h
      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d', { willReadFrequently: true })
      if (!octx) return
      const fit = containRect(source.naturalWidth, source.naturalHeight, w, h)
      octx.drawImage(source, fit.x, fit.y, fit.w, fit.h)
      tilePx = Math.round(TILE_CSS_PX * dpr)
      tiles = sampleTiles(octx.getImageData(0, 0, w, h).data, w, h, tilePx)
      jitter = tiles.map(() => (Math.random() - 0.5) * 0.12)
      draw()
      setReady(true)
      start()
    }

    source.onload = () => {
      if (!cancelled) build()
    }
    source.src = src

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer = { x: (e.clientX - r.left) * dpr, y: (e.clientY - r.top) * dpr }
      if (reduced) draw()
    }
    const onLeave = () => {
      pointer = null
      if (reduced) draw()
    }
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)

    const io =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            if (visible) start()
            else if (raf) {
              cancelAnimationFrame(raf)
              raf = 0
            }
          })
    io?.observe(wrap)

    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => build())
    ro?.observe(wrap)

    return () => {
      cancelled = true
      if (raf) cancelAnimationFrame(raf)
      source.onload = null
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      io?.disconnect()
      ro?.disconnect()
    }
  }, [src])

  return (
    <div ref={wrapRef} role="img" aria-label={ALT} className={className} style={{ position: 'relative' }}>
      <img
        ref={imgRef}
        src={src}
        alt=""
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'grayscale(1) sepia(.3) hue-rotate(180deg)',
          visibility: ready ? 'hidden' : 'visible',
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: ready ? 'block' : 'none',
        }}
      />
    </div>
  )
}
