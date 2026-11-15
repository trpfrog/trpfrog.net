import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { PageNavigation } from '.'

vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('q=foo&p=1') }))

describe('tweets PageNavigation', () => {
  it('keeps the search query and jumps to the tweets', () => {
    render(<PageNavigation currentPage={1} lastPage={4} numTweets={180} />)
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute(
      'href',
      '/tweets?q=foo&p=3#tweets',
    )
    expect(screen.getByText('180 ツイート中 50 件を表示')).toBeInTheDocument()
  })

  it('shows the remaining count on the last page', () => {
    render(<PageNavigation currentPage={4} lastPage={4} numTweets={180} />)
    expect(screen.getByText('180 ツイート中 30 件を表示')).toBeInTheDocument()
  })

  it('renders nothing without tweets', () => {
    const { container } = render(<PageNavigation currentPage={1} lastPage={1} numTweets={0} />)
    expect(container).toBeEmptyDOMElement()
  })
})
