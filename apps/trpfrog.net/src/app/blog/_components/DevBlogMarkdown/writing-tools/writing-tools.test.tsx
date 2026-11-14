import { useState } from 'react'

import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { TwitterCardSection } from './twitter-card-section'
import { WritingToolsPanel } from './writing-tools-panel'

function Panel() {
  const [opened, setOpened] = useState(false)
  return (
    <WritingToolsPanel isOpened={opened} onOpenChange={setOpened} footer={<p>footer</p>}>
      <p>tools</p>
    </WritingToolsPanel>
  )
}

describe('WritingToolsPanel', () => {
  it('shows the tools only while open and always shows the footer', async () => {
    render(<Panel />)
    expect(screen.queryByText('tools')).toBeNull()
    expect(screen.getByText('footer')).toBeInTheDocument()

    await act(async () => {
      screen.getByRole('button', { name: 'Writing Tools' }).click()
    })
    expect(screen.getByText('tools')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Writing Tools' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })
})

describe('TwitterCardSection', () => {
  function renderSection(tweetUrl: string) {
    const handlers = {
      onTweetUrlChange: vi.fn<(value: string) => void>(),
      onGenerate: vi.fn<() => void>(),
      onGenerateFromServerClipboard: vi.fn<() => void>(),
    }
    render(<TwitterCardSection tweetUrl={tweetUrl} {...handlers} />)
    return handlers
  }

  it('generates from the server clipboard while the URL is empty', async () => {
    const handlers = renderSection('')
    await act(async () => {
      screen.getByRole('button', { name: 'Generate from server clipboard' }).click()
    })
    expect(handlers.onGenerateFromServerClipboard).toHaveBeenCalledOnce()
    expect(handlers.onGenerate).not.toHaveBeenCalled()
  })

  it('generates from the typed URL', async () => {
    const handlers = renderSection('https://x.com/trpfrog/status/1')
    await act(async () => {
      screen.getByRole('button', { name: 'Generate' }).click()
    })
    expect(handlers.onGenerate).toHaveBeenCalledOnce()
  })

  it('reports typing in the URL field', () => {
    const handlers = renderSection('')
    fireEvent.input(screen.getByRole('textbox', { name: 'Tweet URL' }), {
      target: { value: 'https://x.com' },
    })
    expect(handlers.onTweetUrlChange).toHaveBeenLastCalledWith('https://x.com')
  })
})
