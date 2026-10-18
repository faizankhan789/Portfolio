import '@testing-library/jest-dom/vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import type Lenis from 'lenis'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Nav from './Nav'
import { setLenis } from '../lib/lenis'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

describe('Nav', () => {
  afterEach(() => {
    cleanup()
    setLenis(null)
    vi.unstubAllGlobals()
  })

  it('flags scrolled state on the header', () => {
    const { container } = render(<Nav sections={sections} />)
    const header = container.querySelector('header')!
    expect(header).toHaveAttribute('data-scrolled', 'false')
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true })
    fireEvent.scroll(window)
    expect(header).toHaveAttribute('data-scrolled', 'true')
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
    fireEvent.scroll(window)
    expect(header).toHaveAttribute('data-scrolled', 'false')
  })

  it('toggles the menu and returns focus on Escape', () => {
    render(<Nav sections={sections} />)
    const toggle = screen.getByRole('button', { name: /menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByTestId('nav-menu')).not.toHaveAttribute('inert')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('renders anchor links', () => {
    render(<Nav sections={sections} />)
    for (const s of sections) {
      const links = screen.getAllByRole('link', { name: s.label, hidden: true })
      expect(links.some((l) => l.getAttribute('href') === `#${s.id}`)).toBe(true)
    }
  })

  it('stops smooth scroll and locks the body while the menu is open', () => {
    const lenis = { stop: vi.fn(), start: vi.fn() }
    setLenis(lenis as unknown as Lenis)
    render(<Nav sections={sections} />)
    fireEvent.click(screen.getByRole('button', { name: /menu/i }))
    expect(lenis.stop).toHaveBeenCalled()
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.click(screen.getByRole('button', { name: /menu/i }))
    expect(lenis.start).toHaveBeenCalledTimes(1)
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('closes the menu when the viewport grows to desktop width', () => {
    const listeners: ((e: { matches: boolean }) => void)[] = []
    const mm = vi.fn((q: string) => ({
      matches: false,
      media: q,
      addEventListener: (_: string, fn: (e: { matches: boolean }) => void) => listeners.push(fn),
      removeEventListener: (_: string, fn: (e: { matches: boolean }) => void) => {
        const i = listeners.indexOf(fn)
        if (i >= 0) listeners.splice(i, 1)
      },
    }))
    vi.stubGlobal('matchMedia', mm)
    render(<Nav sections={sections} />)
    const toggle = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(toggle)
    expect(mm).toHaveBeenCalledWith('(min-width: 900px)')
    act(() => listeners.forEach((fn) => fn({ matches: true })))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('maps sections tagged data-nav onto their nav link', () => {
    let cb: IntersectionObserverCallback = () => {}
    const observed: Element[] = []
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(fn: IntersectionObserverCallback) {
          cb = fn
        }
        observe(el: Element) {
          observed.push(el)
        }
        disconnect() {}
      },
    )
    const extra = document.createElement('section')
    extra.dataset.nav = 'about'
    document.body.appendChild(extra)
    render(<Nav sections={sections} />)
    expect(observed).toContain(extra)
    act(() => cb([{ isIntersecting: true, target: extra } as unknown as IntersectionObserverEntry], {} as IntersectionObserver))
    const link = screen.getAllByRole('link', { name: 'About', hidden: true })[0]
    expect(link).toHaveAttribute('aria-current', 'true')
    extra.remove()
  })
})
