import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Contact from './Contact'
import Credentials from './Credentials'
import { site } from '../data/site'

describe('Contact', () => {
  afterEach(cleanup)

  it('renders heading, mailto and tel links', () => {
    const { container } = render(<Contact />)
    expect(container.querySelector('section#contact')).not.toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: "Let's build" })).toBeInTheDocument()
    expect(container.querySelector(`a[href="mailto:${site.email}"]`)).not.toBeNull()
    expect(container.querySelector('a[href^="tel:"]')).not.toBeNull()
  })

  it('has safe external GitHub and LinkedIn links', () => {
    render(<Contact />)
    for (const [name, href] of [
      ['GitHub profile', site.github],
      ['LinkedIn profile', site.linkedin],
    ]) {
      const a = screen.getByRole('link', { name })
      expect(a).toHaveAttribute('href', href)
      expect(a).toHaveAttribute('target', '_blank')
      expect(a).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})

describe('Credentials', () => {
  afterEach(cleanup)
  it('renders section, education and certification links', () => {
    const { container } = render(<Credentials />)
    expect(container.querySelector('section#credentials')).not.toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: 'Credentials' })).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(5)
    expect(screen.getByRole('link', { name: /View certificate: OWASP Top 10 LLM 2025/ })).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
