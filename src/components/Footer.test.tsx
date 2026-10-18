import '@testing-library/jest-dom/vitest'
import { act, cleanup, render } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Footer from './Footer'

describe('Footer', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('prerenders the build year regardless of the clock', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(__BUILD_YEAR__ + 3, 5, 1))
    const html = renderToString(<Footer />).replace(/<!-- -->/g, '')
    expect(html).toContain(`© ${__BUILD_YEAR__}`)
    expect(html).not.toContain(String(__BUILD_YEAR__ + 3))
  })

  it('hydrates without mismatch in a later year, then shows the current year', async () => {
    const html = renderToString(<Footer />)
    const next = __BUILD_YEAR__ + 1
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(next, 0, 2))
    const el = document.createElement('div')
    el.innerHTML = html
    document.body.appendChild(el)
    const onRecoverableError = vi.fn()
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
    let root: ReturnType<typeof hydrateRoot> | undefined
    await act(async () => {
      root = hydrateRoot(el, <Footer />, { onRecoverableError })
    })
    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(errors).not.toHaveBeenCalled()
    expect(el.textContent).toContain(`© ${next}`)
    act(() => root?.unmount())
    el.remove()
    errors.mockRestore()
  })

  it('renders the current year on the client', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2031, 3, 1))
    const { container } = render(<Footer />)
    expect(container).toHaveTextContent('© 2031')
  })
})
