import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Services from './Services'
import { services } from '../data/services'

describe('Services', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('is the services section with heading and numbered rows', () => {
    const { container } = render(<Services />)
    expect(container.querySelector('section#services')).not.toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: 'What I can do' })).toBeInTheDocument()
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(services.length)
    expect(buttons[0].textContent).toContain('01')
    expect(buttons[2].textContent).toContain('03')
  })

  it('toggles a row and reveals its summary', () => {
    render(<Services />)
    const btn = screen.getAllByRole('button')[0]
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    const region = document.getElementById(btn.getAttribute('aria-controls')!)!
    expect(region.hidden).toBe(true)
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(region.hidden).toBe(false)
    expect(region).toHaveTextContent(services[0].summary)
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(region.hidden).toBe(true)
  })

  it('prerenders every panel expanded so summaries work without JS', () => {
    const host = document.createElement('div')
    host.innerHTML = renderToString(<Services />)
    const buttons = host.querySelectorAll('button')
    expect(buttons).toHaveLength(services.length)
    buttons.forEach((b, i) => {
      expect(b).toHaveAttribute('aria-expanded', 'true')
      const region = host.querySelector(`#${b.getAttribute('aria-controls')}`) as HTMLElement
      expect(region.hidden).toBe(false)
      expect(region).toHaveTextContent(services[i].summary)
    })
  })

  it('collapses after mount with aria state matching', () => {
    render(<Services />)
    for (const b of screen.getAllByRole('button')) {
      expect(b).toHaveAttribute('aria-expanded', 'false')
      expect(document.getElementById(b.getAttribute('aria-controls')!)!.hidden).toBe(true)
    }
  })

  it('refreshes ScrollTrigger after the open row changes', () => {
    const refresh = vi.spyOn(ScrollTrigger, 'refresh').mockImplementation(() => {})
    render(<Services />)
    refresh.mockClear()
    fireEvent.click(screen.getAllByRole('button')[1])
    expect(refresh).toHaveBeenCalled()
  })
})
