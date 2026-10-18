import '@testing-library/jest-dom/vitest'
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Stack from './Stack'

describe('Stack', () => {
  afterEach(cleanup)
  it('hides the duplicated marquee content from assistive tech', () => {
    const { container } = render(<Stack />)
    expect(container.querySelectorAll('[data-marquee-dup][aria-hidden="true"]').length).toBeGreaterThan(0)
  })
})
