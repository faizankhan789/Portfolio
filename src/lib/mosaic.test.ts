import { describe, expect, it } from 'vitest'
import { containRect, sampleTiles, tileColor } from './mosaic'

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
  it('letterboxes vertically in a tall box', () => {
    expect(containRect(200, 100, 100, 200)).toEqual({ x: 0, y: 75, w: 100, h: 50 })
  })
})
