import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Experience from './Experience'
import { roles } from '../data/experience'

describe('Experience', () => {
  afterEach(cleanup)

  it('renders section, heading and roles in order', () => {
    const { container } = render(<Experience />)
    expect(container.querySelector('section#experience')).not.toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeInTheDocument()
    const items = container.querySelectorAll('[data-role]')
    expect(items).toHaveLength(4)
    roles.forEach((r, i) => expect(items[i]).toHaveTextContent(r.company))
  })

  it('shows 4 NexaQuanta engagements', () => {
    const { container } = render(<Experience />)
    const first = container.querySelector('[data-role]')!
    expect(first.querySelectorAll('[data-engagement]')).toHaveLength(4)
  })
})
