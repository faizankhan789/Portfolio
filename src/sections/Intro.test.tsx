import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Intro from './Intro'
import { site } from '../data/site'

describe('Intro', () => {
  afterEach(cleanup)

  it('is the about section with an Intro heading', () => {
    const { container } = render(<Intro />)
    expect(container.querySelector('section#about')).not.toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: 'Intro' })).toBeInTheDocument()
  })

  it('splits the about text into word spans that rejoin to site.about', () => {
    const { container } = render(<Intro />)
    const words = Array.from(container.querySelectorAll('[data-word]')).map((w) => w.textContent)
    expect(words.join(' ')).toBe(site.about)
  })

  it('shows current role and highlights', () => {
    render(<Intro />)
    expect(screen.getByText(/Currently at NexaQuanta/)).toBeInTheDocument()
    for (const h of site.highlights) expect(screen.getByText(h.value)).toBeInTheDocument()
  })
})
