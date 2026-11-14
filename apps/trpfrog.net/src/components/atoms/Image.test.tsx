import { act, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { Image } from './Image'

vi.mock('@/components/utils/CldImageWrapper', () => ({
  CldImageWrapper: (props: { alt: string }) => <span role="img" aria-label={props.alt} />,
}))

describe('Image spoiler', () => {
  it('has no spoiler button by default', () => {
    render(<Image src="/a.png" alt="写真" width={1000} height={500} />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('reveals and hides the image when its spoiler button is pressed', async () => {
    render(<Image src="/a.png" alt="写真" width={1000} height={500} withSpoiler />)
    const button = screen.getByRole('button', { name: '画像を表示する' })
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(button.parentElement).toHaveClass('tw:backdrop-blur-2xl')

    await act(async () => {
      button.click()
    })
    expect(screen.getByRole('button', { name: '画像を隠す' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(button.parentElement).not.toHaveClass('tw:backdrop-blur-2xl')

    await act(async () => {
      button.click()
    })
    expect(screen.getByRole('button', { name: '画像を表示する' })).toBeInTheDocument()
  })
})
