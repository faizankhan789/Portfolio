import { describe, expect, it } from 'vitest'
import { backingScale, containRect, sampleTiles, tileColor } from './mosaic'

function image(w: number, h: number, px: (x: number, y: number) => [number, number, number, number]) {
  const d = new Uint8ClampedArray(w * h * 4)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) d.set(px(x, y), (y * w + x) * 4)
  return d
}

describe('sampleTiles', () => {
  it('samples opaque white into tiles with lum 1', () => {
    const t = sampleTiles(image(4, 4, () => [255, 255, 255, 255]), 4, 4, 2)
    expect(t).toHaveLength(4)
    expect(t.every((x) => x.lum === 1)).toBe(true)
  })
  it('omits transparent tiles', () => {
    expect(sampleTiles(image(4, 4, () => [255, 255, 255, 0]), 4, 4, 2)).toHaveLength(0)
  })
  it('treats tile=0 (or NaN) as 1px tiles instead of looping forever', () => {
    const d = image(2, 2, () => [255, 255, 255, 255])
    expect(sampleTiles(d, 2, 2, 0)).toHaveLength(4)
    expect(sampleTiles(d, 2, 2, Number.NaN)).toHaveLength(4)
    expect(sampleTiles(d, 2, 2, 0.4)).toHaveLength(4)
  })
  it('returns no tiles for zero or negative sizes', () => {
    const d = new Uint8ClampedArray(0)
    expect(sampleTiles(d, 0, 10, 2)).toEqual([])
    expect(sampleTiles(d, 10, 0, 2)).toEqual([])
    expect(sampleTiles(d, -4, 4, 2)).toEqual([])
  })
  it('orders tiles row-major', () => {
    const d = image(4, 4, (x) => (x < 2 ? [0, 0, 0, 255] : [255, 255, 255, 255]))
    const t = sampleTiles(d, 4, 4, 2)
    expect(t.map((x) => x.lum)).toEqual([0, 1, 0, 1])
    expect(t.map((x) => [x.x, x.y])).toEqual([[0, 0], [1, 0], [0, 1], [1, 1]])
  })
})

describe('tileColor', () => {
  it('maps lum endpoints', () => {
    expect(tileColor(0, 0)).toBe('rgb(14, 18, 32)')
    expect(tileColor(1, 0)).toBe('rgb(201, 214, 242)')
  })
})

describe('containRect', () => {
  it('fills a same-aspect box', () => {
    expect(containRect(100, 200, 50, 100)).toEqual({ x: 0, y: 0, w: 50, h: 100 })
  })
  it('letterboxes horizontally in a wide box', () => {
    expect(containRect(100, 200, 200, 100)).toEqual({ x: 75, y: 0, w: 50, h: 100 })
  })
  it('returns a zero rect for an empty source', () => {
    const zero = { x: 0, y: 0, w: 0, h: 0 }
    expect(containRect(0, 100, 50, 50)).toEqual(zero)
    expect(containRect(100, 0, 50, 50)).toEqual(zero)
    expect(containRect(-1, 100, 50, 50)).toEqual(zero)
  })
  it('letterboxes vertically in a tall box', () => {
    expect(containRect(200, 100, 100, 200)).toEqual({ x: 0, y: 75, w: 100, h: 50 })
  })
})

describe('backingScale', () => {
  it('clamps devicePixelRatio to [1, 3]', () => {
    expect(backingScale(100, 100, 0.5)).toBe(1)
    expect(backingScale(100, 100, 0)).toBe(1)
    expect(backingScale(100, 100, 2)).toBe(2)
    expect(backingScale(100, 100, 8)).toBe(3)
  })
  it('caps the backing store at 4096px per side', () => {
    expect(backingScale(2000, 1000, 3) * 2000).toBe(4096)
    expect(backingScale(1000, 8192, 2) * 8192).toBe(4096)
  })
})
