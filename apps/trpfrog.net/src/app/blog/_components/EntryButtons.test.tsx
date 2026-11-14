import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { RichEntryButtons } from './EntryButtons'

vi.mock('next/navigation', () => ({ usePathname: () => '/blog/x' }))
vi.mock('@/hooks/useShareTweetURL', () => ({
  useShareTweetURL: () => 'https://twitter.com/intent',
}))

const post = { slug: 'x', numberOfPages: 2, currentPage: 1 } as never

describe('RichEntryButtons', () => {
  it('renders each entry as one link, not a button inside a link', () => {
    render(<RichEntryButtons post={post} extended />)
    const expected = [
      ['記事一覧', '/blog'],
      ['ツイート', 'https://twitter.com/intent'],
      ['訂正依頼', 'https://github.com/TrpFrog/trpfrog.net/issues'],
      ['全文表示', '/blog/x/all'],
    ] as const
    for (const [name, href] of expected) {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
      expect(link.querySelector('button')).toBeNull()
    }
    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.getByRole('link', { name: 'ツイート' })).toHaveAttribute('target', '_blank')
  })
})
