import { NextRequest } from 'next/server'

import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { fetchCandidatePaths } from '../paths'
import { suggestFuzzyPath } from '../suggestFuzzyPath'
import { GET } from './route'

const { check } = vi.hoisted(() => ({ check: vi.fn<() => Promise<void>>() }))
vi.mock('@/lib/rateLimit', () => ({ createRateLimit: () => ({ check }) }))
vi.mock('../paths', () => ({ fetchCandidatePaths: vi.fn<typeof fetchCandidatePaths>() }))
vi.mock('../suggestFuzzyPath', () => ({ suggestFuzzyPath: vi.fn<typeof suggestFuzzyPath>() }))

beforeEach(() => {
  check.mockResolvedValue(undefined)
  vi.mocked(fetchCandidatePaths).mockResolvedValue(['/', '/blog'])
  vi.mocked(suggestFuzzyPath).mockResolvedValue('/blog')
})

const request = () => new NextRequest('https://trpfrog.net/fuzzy/weblog')
const context = () => ({ params: Promise.resolve({ input: 'weblog' }) })

describe('fuzzy GET', () => {
  it('redirects to the selected page on the same origin', async () => {
    const response = await GET(request(), context())
    expect(response.headers.get('location')).toBe('https://trpfrog.net/blog')
  })

  it('returns home if fetching candidates fails', async () => {
    vi.mocked(fetchCandidatePaths).mockRejectedValueOnce(new Error('content server unavailable'))
    expect((await GET(request(), context())).headers.get('location')).toBe('https://trpfrog.net/')
    expect(suggestFuzzyPath).not.toHaveBeenCalled()
  })

  it('does not fetch candidates or call OpenAI when rate limited', async () => {
    check.mockRejectedValueOnce(new Error('rate limited'))
    expect((await GET(request(), context())).headers.get('location')).toBe('https://trpfrog.net/')
    expect(fetchCandidatePaths).not.toHaveBeenCalled()
    expect(suggestFuzzyPath).not.toHaveBeenCalled()
  })

  it('returns home if the decision fails', async () => {
    vi.mocked(suggestFuzzyPath).mockRejectedValueOnce(new Error('decision refused'))
    expect((await GET(request(), context())).headers.get('location')).toBe('https://trpfrog.net/')
  })
})
