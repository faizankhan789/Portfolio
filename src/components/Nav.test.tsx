import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Nav from './Nav'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

describe('Nav', () => {
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
})
