// @vitest-environment node
import { NextRequest } from 'next/server'

import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { getPost, listTags, searchPosts } from '@/lib/agent-api/blog'
import { openApiDocument } from '@/lib/agent-api/openapi'

import { GET } from './route'

vi.mock('@/lib/agent-api/blog', () => ({
  getPost: vi.fn<typeof getPost>(),
  listTags: vi.fn<typeof listTags>(),
  searchPosts: vi.fn<typeof searchPosts>(),
}))

beforeEach(() => {
  vi.mocked(searchPosts).mockResolvedValue([])
  vi.mocked(listTags).mockResolvedValue([])
  vi.mocked(getPost).mockResolvedValue(null)
})

const get = (path: string) => GET(new NextRequest(`https://trpfrog.net${path}`))

async function problemOf(path: string) {
  const res = await get(path)
  return { status: res.status, type: res.headers.get('content-type'), body: await res.json() }
}

describe('public API v1', () => {
  it('passes search parameters through', async () => {
    const res = await get('/api/v1/blog/posts?q=徒歩&tag=日記&limit=5')
    expect(res.status).toBe(200)
    expect(searchPosts).toHaveBeenCalledWith({ query: '徒歩', tag: '日記', limit: 5 })
  })

  it('returns a post', async () => {
    vi.mocked(getPost).mockResolvedValueOnce({ slug: 'walk', markdown: '# walk' } as never)
    expect(await (await get('/api/v1/blog/posts/walk')).json()).toMatchObject({ slug: 'walk' })
  })

  it.each([
    ['/api/v1/blog/posts?limit=abc', 400, 'invalid_query'],
    ['/api/v1/blog/posts?limit=0', 400, 'invalid_query'],
    ['/api/v1/blog/posts/nope', 404, 'post_not_found'],
    ['/api/v1/nope', 404, 'route_not_found'],
    ['/api/nope', 404, 'route_not_found'],
  ])('returns problem+json for %s', async (path, status, code) => {
    expect(await problemOf(path)).toMatchObject({
      status,
      type: expect.stringContaining('application/problem+json'),
      body: { status, code, title: expect.any(String) },
    })
  })

  it('hides unexpected errors behind a problem+json 500', async () => {
    vi.mocked(listTags).mockRejectedValueOnce(new Error('content server is down'))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(await problemOf('/api/v1/blog/tags')).toMatchObject({
      status: 500,
      type: expect.stringContaining('application/problem+json'),
      body: { code: 'internal_error' },
    })
  })

  it.each(Object.keys(openApiDocument.paths))('serves the documented path %s', async path => {
    const res = await get(`/api/v1${path.replace('{slug}', 'walk')}`)
    expect(await res.json()).not.toMatchObject({ code: 'route_not_found' })
  })
})

describe('OpenAPI document', () => {
  type Operation = {
    operationId: string
    responses: Record<string, { content: Record<string, { schema: object }> }>
  }
  const paths: Record<string, { get: Operation }> = openApiDocument.paths
  const operations = Object.values(paths).map(path => path.get)
  const responses: [string, string, string[]][] = operations.flatMap(op =>
    Object.entries(op.responses).map(([status, response]): [string, string, string[]] => [
      `${op.operationId} ${status}`,
      status,
      Object.keys(response.content),
    ]),
  )

  it.each(responses)('types the %s response so agents can parse it', (_, status, contentTypes) => {
    const type = status.startsWith('2') ? 'application/json' : 'application/problem+json'
    expect(contentTypes).toEqual([type])
  })

  it('gives every operation a unique operationId', () => {
    const ids = operations.map(op => op.operationId)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
