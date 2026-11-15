import { act, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { BackToTop } from './BackToTop'

describe('BackToTop', () => {
  it('scrolls smoothly to the top when pressed', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    render(<BackToTop />)
    await act(async () => {
      screen.getByRole('button', { name: 'ページの先頭に戻る' }).click()
    })
    expect(scrollTo).toHaveBeenCalledExactlyOnceWith({ top: 0, behavior: 'smooth' })
  })
})
