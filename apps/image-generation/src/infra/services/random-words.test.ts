import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { randomWordApi } from './random-words'

describe('randomWordApi', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('requests each part of speech and flattens the words', async () => {
    const requestedUrls: URL[] = []
    const fetchMock = vi.fn<typeof fetch>(async input => {
      const url = new URL(input instanceof Request ? input.url : input)
      requestedUrls.push(url)
      const count = Number(url.searchParams.get('count'))
      const type = url.searchParams.get('type')
      return Response.json(Array.from({ length: count }, (_, i) => ({ word: `${type}${i}` })))
    })
    vi.stubGlobal('fetch', fetchMock)

    await expect(randomWordApi({ noun: 2, verb: 1, adjective: 1 })).resolves.toEqual([
      'noun0',
      'noun1',
      'verb0',
      'adjective0',
    ])
    expect(requestedUrls.map(url => url.searchParams.get('type'))).toEqual([
      'noun',
      'verb',
      'adjective',
    ])
    expect(requestedUrls[0]?.href).toContain('https://randomapi.dev/api/words?')
    expect(requestedUrls[0]?.searchParams.get('unwrap')).toBe('true')
  })

  it('reports the status when the API fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>(async () => new Response('Payment required', { status: 402 })),
    )

    await expect(randomWordApi({ noun: 1, verb: 1, adjective: 1 })).rejects.toThrowError(
      /responded with 402: Payment required/,
    )
  })
})
