import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import type { Project } from '../data/types'
import ProjectCard from './ProjectCard'

const base: Project = {
  slug: 'x',
  title: 'Codebase Flow Video',
  accentWord: 'Flow',
  summary: 'Summary text.',
  stack: ['A', 'B'],
  tier: 'feature',
}

describe('ProjectCard', () => {
  afterEach(cleanup)

  it('renders a placeholder with the title and no img when image is missing', () => {
    const { container } = render(<ProjectCard project={base} index={0} />)
    expect(container.querySelector('img')).toBeNull()
    const ph = container.querySelector('[data-placeholder]')!
    expect(ph).toBeInTheDocument()
    expect(ph.textContent).toContain('Codebase Flow Video')
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Codebase Flow Video')
  })

  it('renders an img with alt and dimensions when image is present', () => {
    const { container } = render(<ProjectCard project={{ ...base, image: 'images/p.jpg' }} index={1} />)
    const img = container.querySelector('img')!
    expect(img).toHaveAttribute('alt', 'Codebase Flow Video preview')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(container.querySelector('[data-placeholder]')).toBeNull()
  })

  it('renders safe external Live demo link', () => {
    render(<ProjectCard project={{ ...base, live: 'https://example.com' }} index={0} />)
    const a = screen.getByRole('link', { name: /live demo/i })
    expect(a).toHaveAttribute('target', '_blank')
    expect(a).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows disclaimer and omits GitHub without repo', () => {
    render(<ProjectCard project={{ ...base, disclaimer: 'Not advice.' }} index={0} />)
    expect(screen.getByText('Not advice.')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /github/i })).toBeNull()
  })

  it('shows GitHub link with repo', () => {
    render(<ProjectCard project={{ ...base, repo: 'https://github.com/a/b' }} index={0} />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/a/b')
  })
})
