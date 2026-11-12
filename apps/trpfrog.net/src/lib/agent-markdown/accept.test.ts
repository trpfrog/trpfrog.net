import { describe, expect, it } from 'vite-plus/test'

import { prefersMarkdown } from './accept'

describe('prefersMarkdown', () => {
  it.each([
    'text/markdown',
    'text/markdown, text/html;q=0.9',
    'text/markdown, */*',
    'text/html;q=0.5, text/markdown;q=0.8',
    'TEXT/MARKDOWN',
    'text/markdown;charset=utf-8',
  ])('prefers markdown for %s', accept => {
    expect(prefersMarkdown(accept)).toBe(true)
  })

  it.each([
    undefined,
    '',
    '*/*',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'text/html, text/markdown;q=0.5',
    'text/markdown;q=0',
    'text/plain',
  ])('does not prefer markdown for %s', accept => {
    expect(prefersMarkdown(accept)).toBe(false)
  })
})
