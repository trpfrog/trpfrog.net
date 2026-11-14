import { act, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { RichButton } from '.'

describe('RichButton', () => {
  it('is a native button by default', async () => {
    const onClick = vi.fn<() => void>()
    render(<RichButton onClick={onClick}>音を鳴らす</RichButton>)
    const button = screen.getByRole('button', { name: '音を鳴らす' })
    expect(button).toHaveAttribute('type', 'button')

    await act(async () => {
      button.click()
    })
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('submits its form with type="submit"', async () => {
    const onSubmit = vi.fn<(e: React.FormEvent) => void>(e => e.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <RichButton type="submit">編集する</RichButton>
      </form>,
    )
    await act(async () => {
      screen.getByRole('button', { name: '編集する' }).click()
    })
    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it('renders as a Next.js link', () => {
    render(<RichButton href="/blog">記事一覧</RichButton>)
    const link = screen.getByRole('link', { name: '記事一覧' })
    expect(link).toHaveAttribute('href', '/blog')
    expect(link).not.toHaveAttribute('type')
  })

  it('opens external links in a new tab through A', () => {
    render(<RichButton href="https://example.com">外部</RichButton>)
    const link = screen.getByRole('link', { name: '外部' })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('keeps its own class names next to the shared look', () => {
    render(<RichButton className="extra">x</RichButton>)
    const button = screen.getByRole('button', { name: 'x' })
    expect(button).toHaveClass('extra')
    expect(button).toHaveClass('tw:rounded-full')
  })

  it('ignores presses while disabled', async () => {
    const onClick = vi.fn<() => void>()
    render(
      <RichButton disabled onClick={onClick}>
        x
      </RichButton>,
    )
    const button = screen.getByRole('button', { name: 'x' })
    expect(button).toBeDisabled()
    await act(async () => {
      button.click()
    })
    expect(onClick).not.toHaveBeenCalled()
  })
})
