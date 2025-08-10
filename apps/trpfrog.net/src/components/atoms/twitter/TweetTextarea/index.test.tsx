import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { LOREM_IPSUM } from '@/lib/constants'

import { TweetTextarea, parseTweet } from '.'

describe('TweetTextarea', () => {
  test('snapshot test', () => {
    const view = render(<TweetTextarea tweet={''} />)
    expect(view.asFragment()).toMatchSnapshot()
  })

  test('should render correctly', () => {
    render(<TweetTextarea tweet={LOREM_IPSUM} />)
    expect(screen.getByText(LOREM_IPSUM)).toBeInTheDocument()
  })
})

describe('parseTweet', () => {
  test('should return empty string', () => {
    const tweet = ''
    const parsed = parseTweet(tweet)
    expect(parsed).toBe('')
  })

  test('should return same string', () => {
    const tweet = 'Hello, world!'
    const parsed = parseTweet(tweet)
    expect(parsed).toBe(tweet)
  })

  test('should parse URL', () => {
    const tweet = 'https://example.com'
    const parsed = parseTweet(tweet)
    expect(parsed).toBe(
      '<a class="link" href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a>',
    )
  })

  test('should parse mention', () => {
    const tweet = '@TrpFrog'
    const parsed = parseTweet(tweet)
    expect(parsed).toBe(
      '<a class="mention" href="https://twitter.com/TrpFrog" target="_blank" rel="noopener noreferrer">@TrpFrog</a>',
    )
  })

  test('should parse hashtag', () => {
    const tweet = '#hashtag'
    const parsed = parseTweet(tweet)
    expect(parsed).toBe(
      '<a class="hashtag" href="https://twitter.com/hashtag/hashtag" target="_blank" rel="noopener noreferrer">#hashtag</a>',
    )
  })

  test('should parse multiple', () => {
    const tweet = 'https://example.com @TrpFrog #hashtag'
    const parsed = parseTweet(tweet)
    expect(parsed).toBe(
      '<a class="link" href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a> <a class="mention" href="https://twitter.com/TrpFrog" target="_blank" rel="noopener noreferrer">@TrpFrog</a> <a class="hashtag" href="https://twitter.com/hashtag/hashtag" target="_blank" rel="noopener noreferrer">#hashtag</a>',
    )
  })

  test('should not parse there is no space', () => {
    const tweet = '@TrpFrog#hashtag@TrpFrog#hashtag@TrpFrog#hashtag'
    const parsed = parseTweet(tweet)
    expect(parsed).toBe(tweet)
  })
})
