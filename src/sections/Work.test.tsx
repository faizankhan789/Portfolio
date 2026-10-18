import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { projects } from '../data/projects'
import Work from './Work'

describe('Work', () => {
  afterEach(cleanup)

  it('renders section, numbered cards in order, and list rows', () => {
    const { container } = render(<Work />)
    expect(container.querySelector('section#work')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Selected work' })).toBeInTheDocument()
    const cards = container.querySelectorAll('[data-card]')
    expect(cards).toHaveLength(6)
    const features = projects.filter((p) => p.tier === 'feature')
    cards.forEach((c, i) => {
      expect(c.textContent).toContain(String(i + 1).padStart(2, '0'))
      expect(within(c as HTMLElement).getByRole('heading', { level: 3 })).toHaveTextContent(features[i].title)
    })
    expect(screen.getByRole('heading', { name: /more projects/i })).toBeInTheDocument()
    expect(container.querySelectorAll('[data-row]')).toHaveLength(5)
  })

  it('shows Private for arabic-search and never the banned phrase', () => {
    const { container } = render(<Work />)
    const row = container.querySelector('[data-row="arabic-search"]') as HTMLElement
    expect(within(row).getByText('Private')).toBeInTheDocument()
    expect(container.textContent).not.toMatch(/linkedin auto-apply/i)
  })
})
