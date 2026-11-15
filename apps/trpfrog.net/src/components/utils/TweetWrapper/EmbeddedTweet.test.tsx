import { act, render, screen } from '@testing-library/react'
import type { Tweet } from 'react-tweet/api'
import { describe, expect, it, vi } from 'vite-plus/test'

import { EmbeddedTweet } from './EmbeddedTweet'

vi.mock('react-tweet', () => {
  const Part = () => null
  return {
    enrichTweet: (tweet: Record<string, unknown>) => ({
      ...tweet,
      url: 'https://x.com/trpfrog/status/1',
      like_url: 'https://x.com/intent/like?tweet_id=1',
      reply_url: 'https://x.com/intent/tweet?in_reply_to=1',
    }),
    TweetContainer: (props: { children: React.ReactNode }) => <article>{props.children}</article>,
    TweetHeader: Part,
    TweetInReplyTo: Part,
    TweetBody: Part,
    TweetMedia: Part,
    QuotedTweet: Part,
    TweetInfo: Part,
    TweetReplies: Part,
  }
})

describe('EmbeddedTweet actions', () => {
  function mockWriteText() {
    return vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
  }

  it('links to like and reply on X', () => {
    render(<EmbeddedTweet tweet={{ favorite_count: 3 } as unknown as Tweet} />)
    expect(screen.getByRole('link', { name: 'いいね (3)' })).toHaveAttribute(
      'href',
      'https://x.com/intent/like?tweet_id=1',
    )
    expect(screen.getByRole('link', { name: 'Reply' })).toHaveAttribute(
      'href',
      'https://x.com/intent/tweet?in_reply_to=1',
    )
  })

  it('copies the tweet URL with a ui-sdk button', async () => {
    const writeText = mockWriteText()
    render(<EmbeddedTweet tweet={{ favorite_count: 0 } as unknown as Tweet} />)
    const copy = screen.getByRole('button', { name: 'Copy' })
    expect(copy).toHaveAttribute('data-slot', 'tooltip-trigger')
    await act(async () => {
      copy.click()
    })
    expect(writeText).toHaveBeenCalledExactlyOnceWith('https://x.com/trpfrog/status/1')
  })
})
