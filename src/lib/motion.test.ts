import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { prefersReducedMotion, useGsap } from './motion'

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  })) as unknown as typeof window.matchMedia
}

describe('motion', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('prefersReducedMotion is false without window', () => {
    vi.stubGlobal('window', undefined)
    expect(prefersReducedMotion()).toBe(false)
  })

  it('skips setup under reduced motion', () => {
    mockMatchMedia(true)
    const setup = vi.fn()
    const el = document.createElement('div')
    renderHook(() => useGsap({ current: el }, setup))
    expect(setup).not.toHaveBeenCalled()
  })

  it('runs setup once otherwise', () => {
    mockMatchMedia(false)
    const setup = vi.fn()
    const el = document.createElement('div')
    renderHook(() => useGsap({ current: el }, setup))
    expect(setup).toHaveBeenCalledTimes(1)
  })
})
