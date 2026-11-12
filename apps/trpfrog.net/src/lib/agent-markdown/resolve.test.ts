// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import type { BlogPost } from '@trpfrog.net/posts'

import { fetchCandidatePaths } from '@/app/fuzzy/paths'
import { fetchPost, fetchPostList, fetchSlugs } from '@blog/rpc'

import { resolveMarkdown } from './resolve'

vi.mock('@blog/rpc', () => ({
  fetchPost: vi.fn<typeof fetchPost>(),
  fetchPostList: vi.fn<typeof fetchPostList>(),
  fetchSlugs: vi.fn<typeof fetchSlugs>(),
}))
vi.mock('@/app/fuzzy/paths', () => ({ fetchCandidatePaths: vi.fn<typeof fetchCandidatePaths>() }))

const post = {
  slug: 'walk',
  title: 'Walk',
  date: '2026-01-01',
  tags: ['徒歩'],
  markdown: '# Walk body',
} as BlogPost

beforeEach(() => {
  vi.mocked(fetchPostList).mockResolvedValue([post])
  vi.mocked(fetchSlugs).mockResolvedValue(['walk'])
  vi.mocked(fetchPost).mockResolvedValue(post)
  vi.mocked(fetchCandidatePaths).mockResolvedValue(['/', '/works', '/blog/walk'])
})

describe('resolveMarkdown', () => {
  it('builds the home page', async () => {
    const { body, status } = await resolveMarkdown('/')
    expect(status).toBe(200)
    expect(body).toContain('# つまみネット')
    expect(body).toContain('[Walk](/blog/walk.md)')
  })

  it('builds the blog index', async () => {
    expect(await resolveMarkdown('/blog')).toMatchObject({
      status: 200,
      body: expect.stringContaining('[Walk](/blog/walk.md)'),
    })
  })

  it('returns a post with all pages by default', async () => {
    expect(await resolveMarkdown('/blog/walk')).toEqual({ body: '# Walk body', status: 200 })
    expect(fetchPost).toHaveBeenCalledWith('walk', 'all')
  })

  it('returns a single page of a post', async () => {
    await resolveMarkdown('/blog/walk/2')
    expect(fetchPost).toHaveBeenCalledWith('walk', 2)
  })

  it.each([
    ['an unknown post', '/blog/nope'],
    ['an invalid page number', '/blog/walk/abc'],
    ['an unknown path', '/nope'],
  ])('returns 404 for %s', async (_, path) => {
    expect(await resolveMarkdown(path)).toMatchObject({
      status: 404,
      body: expect.stringContaining('404 Not Found'),
    })
  })

  it('returns 404 when the post has no such page', async () => {
    vi.mocked(fetchPost).mockRejectedValueOnce(new Error('InvalidPagePositionError'))
    expect((await resolveMarkdown('/blog/walk/9')).status).toBe(404)
  })

  it.each(['/works', '/blog/tags/徒歩', '/docs/markdown'])(
    'points %s to the HTML version when it has no Markdown version',
    async path => {
      expect(await resolveMarkdown(path)).toMatchObject({
        status: 200,
        body: expect.stringContaining('Markdown 版はありません'),
      })
    },
  )
})
