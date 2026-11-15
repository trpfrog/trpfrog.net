import { render } from '@testing-library/react'
import { describe, expect, it } from 'vite-plus/test'

import { HamburgerIcon } from './HamburgerIcon'

describe('HamburgerIcon', () => {
  it('is hidden from screen readers', () => {
    const { container } = render(<HamburgerIcon open={false} />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('turns the lines into a cross when open', () => {
    const { container, rerender } = render(<HamburgerIcon open={false} />)
    const lines = () => [...(container.firstElementChild?.children ?? [])]
    expect(lines().some(line => line.className.includes('rotate-45'))).toBe(false)

    rerender(<HamburgerIcon open />)
    expect(lines().every(line => line.className.includes('rotate-45'))).toBe(true)
  })
})
