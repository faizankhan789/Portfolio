import '@testing-library/jest-dom/vitest'
import { act, render } from '@testing-library/react'
import gsap from 'gsap'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Preloader from './Preloader'

function mockMM(matches: boolean) {
  window.matchMedia = ((q: string) => ({
    matches,
    media: q,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
    onchange: null,
  })) as unknown as typeof window.matchMedia
}

describe('Preloader', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.sessionStorage.clear()
    document.body.style.overflow = ''
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('failsafe clears a stuck timeline exactly once', () => {
    mockMM(false)
    const stub = { to: () => stub, kill: () => {} }
    vi.spyOn(gsap, 'timeline').mockReturnValue(stub as unknown as gsap.core.Timeline)
    const onDone = vi.fn()
    render(<Preloader onDone={onDone} />)
    expect(document.querySelector('[data-preloader]')).not.toBeNull()
    expect(document.body.style.overflow).toBe('hidden')
    act(() => {
      vi.advanceTimersByTime(3500)
    })
    expect(onDone).toHaveBeenCalledTimes(1)
    expect(document.querySelector('[data-preloader]')).toBeNull()
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('renders nothing and calls onDone under reduced motion', () => {
    mockMM(true)
    const onDone = vi.fn()
    const { container } = render(<Preloader onDone={onDone} />)
    expect(onDone).toHaveBeenCalledTimes(1)
    expect(container.querySelector('[data-preloader]')).toBeNull()
  })
})
