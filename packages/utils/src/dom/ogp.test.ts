import { describe, expect, test } from 'vite-plus/test'

import { parsePageInfo } from './ogp'

describe('parsePageInfo', () => {
  test('prefers Open Graph metadata and keeps optional metadata', () => {
    expect(
      parsePageInfo(`
        <html>
          <head>
            <title>Document title</title>
            <meta property="og:title" content="OG title" />
            <meta property="og:description" content="OG description" />
            <meta property="og:image" content="https://example.com/og.png" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="theme-color" content="#123456" />
          </head>
        </html>
      `),
    ).toEqual({
      title: 'OG title',
      description: 'OG description',
      imageUrl: 'https://example.com/og.png',
      favicon: '/favicon.ico',
      themeColor: '#123456',
    })
  })

  test('falls back from Open Graph title to title, h1, and a default', () => {
    expect(parsePageInfo('<title>Title fallback</title>').title).toBe('Title fallback')
    expect(parsePageInfo('<h1>Heading fallback</h1>').title).toBe('Heading fallback')
    expect(parsePageInfo('<p>No title</p>').title).toBe('No title')
  })

  test('prefers og:image and leaves absent optional values undefined', () => {
    expect(
      parsePageInfo(`
        <meta property="og:image" content="https://example.com/primary.png" />
        <meta property="og:image:url" content="https://example.com/fallback.png" />
        <meta name="description" content="Description fallback" />
      `),
    ).toEqual({
      title: 'No title',
      description: 'Description fallback',
      imageUrl: 'https://example.com/primary.png',
      favicon: undefined,
      themeColor: undefined,
    })
  })
})
