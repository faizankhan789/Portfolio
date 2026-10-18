import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PortraitMosaic from './PortraitMosaic'

describe('PortraitMosaic', () => {
  it('exposes the portrait via the wrapper accessible name', () => {
    render(<PortraitMosaic src="/x.png" />)
    const el = screen.getByRole('img', { name: 'Portrait of Muhammad Faizan Khan' })
    expect(el.tagName).toBe('DIV')
  })
})
