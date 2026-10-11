import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { suggestFuzzyPath } from './suggestFuzzyPath'

vi.mock('@/env/server', () => ({ env: { OPENAI_API_KEY: 'test-key' } }))

afterEach(() => vi.unstubAllGlobals())

describe('suggestFuzzyPath', () => {
  it('asks Decisions API to choose from the current candidate paths', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json({
        answers: [
          {
            type: 'choice',
            name: 'path',
            choice: '/blog/new-post',
            probabilities: [
              { value: '/', probability: 0 },
              { value: '/blog/new-post', probability: 1 },
            ],
          },
        ],
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await expect(suggestFuzzyPath('new post', ['/', '/blog/new-post'])).resolves.toBe(
      '/blog/new-post',
    )
    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.openai.com/v1/decisions')
    const body = options?.body
    if (typeof body !== 'string') throw new Error('Expected a JSON request body')
    expect(JSON.parse(body)).toMatchObject({
      model: 'gpt-6-luna',
      input: [{ role: 'user', content: [{ type: 'input_text', text: 'new post' }] }],
      questions: [{ type: 'choice', choices: [{ value: '/' }, { value: '/blog/new-post' }] }],
    })
  })

  it.each([
    { answers: [{ type: 'refusal', name: 'path' }] },
    { answers: [] },
    {
      answers: [
        {
          type: 'choice',
          name: 'path',
          choice: 'https://example.com',
          probabilities: [
            { value: '/', probability: 0 },
            { value: '/blog', probability: 1 },
          ],
        },
      ],
    },
    {
      answers: [
        {
          type: 'choice',
          name: 'path',
          choice: '//example.com',
          probabilities: [
            { value: '/', probability: 0 },
            { value: '/blog', probability: 1 },
          ],
        },
      ],
    },
    {
      answers: [
        {
          type: 'choice',
          name: 'path',
          choice: '/missing-page',
          probabilities: [
            { value: '/', probability: 0 },
            { value: '/blog', probability: 1 },
          ],
        },
      ],
    },
    { unexpected: 'response' },
  ])('rejects refused, missing, invalid or non-candidate answers: %j', async body => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(Response.json(body)))
    await expect(suggestFuzzyPath('blog', ['/', '/blog'])).rejects.toThrow(/.+/)
  })

  it('rejects unsuccessful API responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn<typeof fetch>()
        .mockResolvedValue(
          Response.json(
            { error: { message: 'rate limited', type: 'rate_limit_error' } },
            { status: 429 },
          ),
        ),
    )
    await expect(suggestFuzzyPath('blog', ['/blog'])).rejects.toThrow('rate limited')
  })
})
