import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Services from './Services'
import { services } from '../data/services'

describe('Services', () => {
  afterEach(cleanup)

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
})
