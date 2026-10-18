import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Hero from './Hero'

describe('Hero', () => {
  afterEach(cleanup)

  it('renders a single h1 with the full name as accessible name', () => {
    render(<Hero />)
    const h1s = screen.getAllByRole('heading', { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1, name: 'Muhammad Faizan Khan' })).toBeInTheDocument()
  })

  it('shows the role and résumé link', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('p')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('AI Engineer')
    const link = screen.getByRole('link', { name: /download résumé/i })
    expect(link.getAttribute('href')).toMatch(/Resume\.pdf$/)
    expect(link).toHaveAttribute('download')
  })

  it('is the home section', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('section#home')).not.toBeNull()
  })
})
