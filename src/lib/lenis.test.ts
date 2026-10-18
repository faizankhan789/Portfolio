import { afterEach, describe, expect, it, vi } from 'vitest'
import type Lenis from 'lenis'
import { getLenis, lockScroll, setLenis } from './lenis'

function fake() {
  return { stop: vi.fn(), start: vi.fn() }
}

describe('lenis scroll lock', () => {
  afterEach(() => {
    setLenis(null)
    document.body.style.overflow = ''
  })

  it('shares the registered instance', () => {
    const l = fake()
    setLenis(l as unknown as Lenis)
    expect(getLenis()).toBe(l)
  })

  it('stops Lenis and hides body overflow until the last lock is released', () => {
    const l = fake()
    setLenis(l as unknown as Lenis)
    const a = lockScroll()
    const b = lockScroll()
    expect(l.stop).toHaveBeenCalled()
    expect(document.body.style.overflow).toBe('hidden')
    a()
    a() // idempotent
    expect(l.start).not.toHaveBeenCalled()
    expect(document.body.style.overflow).toBe('hidden')
    b()
    expect(l.start).toHaveBeenCalledTimes(1)
    expect(document.body.style.overflow).toBe('')
  })

  it('stops an instance registered while a lock is held', () => {
    const release = lockScroll()
    const l = fake()
    setLenis(l as unknown as Lenis)
    expect(l.stop).toHaveBeenCalledTimes(1)
    release()
    expect(l.start).toHaveBeenCalledTimes(1)
  })

  it('still locks body overflow without Lenis (reduced motion)', () => {
    document.body.style.overflow = 'auto'
    const release = lockScroll()
    expect(document.body.style.overflow).toBe('hidden')
    release()
    expect(document.body.style.overflow).toBe('auto')
  })
})
