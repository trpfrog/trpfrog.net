// @vitest-environment node
import { NextRequest } from 'next/server'

import { describe, expect, it, vi } from 'vite-plus/test'

import * as rpc from '@blog/rpc'
import type { fetchPost, fetchPostList, fetchSlugs } from '@blog/rpc'

import proxy from './proxy'

// Proxy では 'use cache' が効かないので、記事のデータを取得すると本番で例外になる。
// そのため Proxy はデータを取らず、Route Handler へ rewrite するだけにしている。
vi.mock('@blog/rpc', () => ({
  fetchPost: vi.fn<typeof fetchPost>(),
  fetchPostList: vi.fn<typeof fetchPostList>(),
  fetchSlugs: vi.fn<typeof fetchSlugs>(),
}))

const ORIGIN = 'https://trpfrog.net'
const MARKDOWN = 'text/markdown'
const BROWSER = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'

async function send(path: string, { accept = BROWSER, method = 'GET' } = {}) {
  const res = await proxy(new NextRequest(`${ORIGIN}${path}`, { method, headers: { accept } }))
  return {
    rewrite: res.headers.get('x-middleware-rewrite'),
    link: res.headers.get('link'),
  }
}

describe('proxy', () => {
  it.each([
    ['/', '/api/markdown'],
    ['/blog', '/api/markdown/blog'],
    ['/blog/recap2025', '/api/markdown/blog/recap2025'],
    ['/blog/recap2025/2', '/api/markdown/blog/recap2025/2'],
    ['/works', '/api/markdown/works'],
    ['/no-such-page', '/api/markdown/no-such-page'],
  ])('rewrites %s to %s when Markdown is preferred', async (path, rewrite) => {
    expect((await send(path, { accept: MARKDOWN })).rewrite).toBe(`${ORIGIN}${rewrite}`)
  })

  it.each([
    ['/blog/recap2025.md', '/api/markdown/blog/recap2025.md'],
    ['/blog/recap2025/2.md', '/api/markdown/blog/recap2025/2.md'],
  ])('rewrites %s to %s for any Accept header', async (path, rewrite) => {
    expect((await send(path)).rewrite).toBe(`${ORIGIN}${rewrite}`)
  })

  it('serves HTML to browsers and advertises the Markdown version', async () => {
    const { rewrite, link } = await send('/blog/recap2025')
    expect(rewrite).toBeNull()
    expect(link).toContain('</blog/recap2025.md>; rel="alternate"; type="text/markdown"')
    expect(link).toContain('</sitemap.xml>; rel="sitemap"')
    expect(link).toContain('</.well-known/api-catalog>; rel="api-catalog"')
  })

  it('does not advertise a Markdown version for pages without one', async () => {
    expect((await send('/works')).link).not.toContain('rel="alternate"')
  })

  it.each(['/api/v1/health', '/mcp', '/_next/static/chunk.js', '/robots.txt', '/llms.txt'])(
    'leaves non-page request %s alone',
    async path => {
      expect(await send(path, { accept: MARKDOWN })).toEqual({ rewrite: null, link: null })
    },
  )

  it('does not rewrite non-GET requests', async () => {
    expect((await send('/', { accept: MARKDOWN, method: 'POST' })).rewrite).toBeNull()
  })

  it('never fetches blog data', async () => {
    for (const path of ['/', '/blog', '/blog/recap2025', '/blog/recap2025.md', '/nope']) {
      await send(path, { accept: MARKDOWN })
      await send(path)
    }
    expect(rpc.fetchPost).not.toHaveBeenCalled()
    expect(rpc.fetchPostList).not.toHaveBeenCalled()
    expect(rpc.fetchSlugs).not.toHaveBeenCalled()
  })
})
