import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { Navigation } from './navigation'

const pathname = vi.hoisted(() => ({ current: '/' }))
vi.mock('next/navigation', () => ({ usePathname: () => pathname.current }))

function renderAt(path: string) {
  pathname.current = path
  render(<Navigation />)
  return screen.getByRole('navigation', { name: 'サイト全体の簡易ナビゲーション' })
}

describe('Navigation', () => {
  it('marks the link of the current section', () => {
    const nav = renderAt('/blog/some-post')
    const current = nav.querySelectorAll('[aria-current="page"]')
    expect([...current].map(a => a.getAttribute('href'))).toEqual(['/blog'])
  })

  it('marks no link outside the listed sections', () => {
    const nav = renderAt('/unknown')
    expect(nav.querySelector('[aria-current]')).toBeNull()
  })
})
