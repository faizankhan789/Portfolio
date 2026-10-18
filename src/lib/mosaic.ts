export type Tile = { x: number; y: number; lum: number }

/** Average each `tile`x`tile` block; x/y are tile-grid indices (row-major). Mostly-transparent tiles are omitted. */
export function sampleTiles(data: Uint8ClampedArray, width: number, height: number, tile: number): Tile[] {
  const out: Tile[] = []
  if (!(width > 0) || !(height > 0)) return out
  const step = Math.max(1, Math.floor(tile) || 1) // tile 0 / NaN would never advance
  const cols = Math.ceil(width / step)
  const rows = Math.ceil(height / step)
  for (let ty = 0; ty < rows; ty++) {
    for (let tx = 0; tx < cols; tx++) {
      let lum = 0
      let alpha = 0
      let n = 0
      const x1 = Math.min((tx + 1) * step, width)
      const y1 = Math.min((ty + 1) * step, height)
      for (let y = ty * step; y < y1; y++) {
        for (let x = tx * step; x < x1; x++) {
          const i = (y * width + x) * 4
          lum += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255
          alpha += data[i + 3] / 255
          n++
        }
      }
      if (n === 0 || alpha / n < 0.5) continue
      out.push({ x: tx, y: ty, lum: Math.round((lum / n) * 1e6) / 1e6 })
    }
  }
  return out
}

const DARK = [14, 18, 32]
const LIGHT = [201, 214, 242]

/** rgb() between #0e1220 (lum 0) and #c9d6f2 (lum 1), shifted by `jitter` (+/- brightness, 0-1 scale). */
export function tileColor(lum: number, jitter: number): string {
  const l = Math.min(1, Math.max(0, lum))
  const shift = jitter * 255
  const c = DARK.map((d, i) => {
    const v = Math.round(d + (LIGHT[i] - d) * l + shift)
    return Math.min(255, Math.max(0, v))
  })
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}

/** Largest rect with the source aspect ratio that fits inside the box, centred (like object-fit: contain). */
export function containRect(srcW: number, srcH: number, boxW: number, boxH: number): { x: number; y: number; w: number; h: number } {
  if (!(srcW > 0) || !(srcH > 0)) return { x: 0, y: 0, w: 0, h: 0 }
  const scale = Math.min(boxW / srcW, boxH / srcH)
  const w = srcW * scale
  const h = srcH * scale
  return { x: (boxW - w) / 2, y: (boxH - h) / 2, w, h }
}

export const MAX_BACKING_PX = 4096

/** Canvas pixel ratio: devicePixelRatio clamped to [1, 3], then lowered so neither side exceeds 4096px. */
export function backingScale(cssW: number, cssH: number, devicePixelRatio: number): number {
  const dpr = Math.min(3, Math.max(1, devicePixelRatio || 1))
  const longest = Math.max(cssW, cssH)
  return longest > 0 ? Math.min(dpr, MAX_BACKING_PX / longest) : dpr
}
