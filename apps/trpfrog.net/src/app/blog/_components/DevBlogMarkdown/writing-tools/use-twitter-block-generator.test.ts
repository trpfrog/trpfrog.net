import { act, renderHook } from '@testing-library/react'
import { toast } from '@ui-sdk/react/toast'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { useTwitterBlockGenerator } from './use-twitter-block-generator'

const post = vi.hoisted(() => vi.fn<(request: unknown) => Promise<Response>>())

vi.mock('@trpfrog.net/dev-blog-server', () => ({
  devBlogServerClient: { create_tweet_block: { $post: post } },
}))

function titles() {
  return toast.toasts().map(t => t.title)
}

describe('useTwitterBlockGenerator', () => {
  const writeText = vi.fn<(text: string) => Promise<void>>()

  beforeEach(() => {
    writeText.mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
  })

  afterEach(() => {
    toast.dismiss()
  })

  it('outputs and copies the generated code block', async () => {
    post.mockResolvedValue(Response.json({ codeBlock: '```twitter\n1\n```' }))
    const onOutput = vi.fn<(codeBlock: string) => void>()
    const { result } = renderHook(() => useTwitterBlockGenerator({ onOutput }))

    await act(async () => {
      await result.current.generateFromUrl('  https://x.com/trpfrog/status/1  ')
    })

    expect(post).toHaveBeenCalledExactlyOnceWith({
      json: { source: 'url', url: 'https://x.com/trpfrog/status/1' },
    })
    expect(onOutput).toHaveBeenCalledExactlyOnceWith('```twitter\n1\n```')
    expect(writeText).toHaveBeenCalledExactlyOnceWith('```twitter\n1\n```')
    expect(titles()).toEqual(expect.arrayContaining(['Generated!', 'Copied!']))
  })

  it('shows the server error and outputs nothing when generation fails', async () => {
    post.mockResolvedValue(Response.json({ error: 'Tweet not found' }, { status: 404 }))
    const onOutput = vi.fn<(codeBlock: string) => void>()
    const { result } = renderHook(() => useTwitterBlockGenerator({ onOutput }))

    await act(async () => {
      await result.current.generateFromServerClipboard()
    })

    expect(onOutput).not.toHaveBeenCalled()
    expect(titles()).toContain('Tweet not found')
  })

  it('tells the user when copying fails', async () => {
    post.mockResolvedValue(Response.json({ codeBlock: 'block' }))
    writeText.mockRejectedValue(new Error('denied'))
    const onOutput = vi.fn<(codeBlock: string) => void>()
    const { result } = renderHook(() => useTwitterBlockGenerator({ onOutput }))

    await act(async () => {
      await result.current.generateFromServerClipboard()
    })

    expect(onOutput).toHaveBeenCalledExactlyOnceWith('block')
    expect(titles()).toContain('クリップボードにコピーできませんでした')
  })
})
