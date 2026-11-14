import { act, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { AICard } from './AICard/AICard'
import { BirdsCard } from './BirdsCard'

vi.mock('./AICard/IconFrame', () => ({ IconFrame: () => <div>icon</div> }))

describe.each([
  {
    name: 'BirdsCard',
    Card: BirdsCard,
    button: 'この鳥について',
    text: 'なぜか2019年からトップページにいる、特に意味のない鳥です',
  },
  {
    name: 'AICard',
    Card: AICard,
    button: 'この画像について',
    text: /これは AI により自動生成された画像です。\s*毎日自動更新されます。/,
  },
])('$name help button', ({ Card, button, text }) => {
  it('is a named button outside of any link', () => {
    render(<Card />)
    const trigger = screen.getByRole('button', { name: button })
    expect(trigger.closest('a')).toBeNull()
  })

  it('describes the card with its tooltip', () => {
    render(<Card />)
    expect(screen.getByRole('button', { name: button })).toHaveAccessibleDescription(text)
  })

  it('shows and hides the tooltip when the button is pressed', async () => {
    render(<Card />)
    const trigger = screen.getByRole('button', { name: button })
    expect(screen.queryByRole('tooltip')).toBeNull()

    await act(async () => {
      trigger.click()
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent(text)

    await act(async () => {
      trigger.click()
    })
    expect(screen.queryByRole('tooltip')).toBeNull()
  })
})

describe('AICard', () => {
  it('still links to the AI icon history', () => {
    render(<AICard />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/ai-icons')
  })
})
