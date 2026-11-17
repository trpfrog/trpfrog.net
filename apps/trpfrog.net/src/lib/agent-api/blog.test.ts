// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import type { BlogPost } from '@trpfrog.net/posts'

import { fetchPost, fetchPostList, fetchSlugs } from '@blog/rpc'

import { fetchBlogPostMarkdown, getPost, listTags, searchPosts } from './blog'

vi.mock('@blog/rpc', () => ({
  fetchPost: vi.fn<typeof fetchPost>(),
  fetchPostList: vi.fn<typeof fetchPostList>(),
  fetchSlugs: vi.fn<typeof fetchSlugs>(),
}))

const post = (slug: string, title: string, tags: string[], description?: string) =>
  ({ slug, title, tags, description, date: '2026-01-01', markdown: `# ${title}` }) as BlogPost

const posts = [
  post('takao', '高尾山に登る', ['徒歩', '登山']),
  post('rust', 'Rust 入門', ['技術'], 'はじめての Rust'),
  post('walk', '東京を歩く', ['徒歩'], '30km 歩いた'),
]

beforeEach(() => {
  vi.mocked(fetchPostList).mockImplementation(async tag =>
    tag ? posts.filter(p => p.tags.includes(tag)) : posts,
  )
  vi.mocked(fetchSlugs).mockResolvedValue(posts.map(p => p.slug))
  vi.mocked(fetchPost).mockImplementation(async slug => {
    const found = posts.find(p => p.slug === slug)
    if (!found) throw new Error(`unknown slug: ${slug}`)
    return found
  })
})

describe('searchPosts', () => {
  it('returns every post with URLs when nothing is given', async () => {
    const result = await searchPosts()
    expect(result.map(p => p.slug)).toEqual(['takao', 'rust', 'walk'])
    expect(result[0]).toMatchObject({
      url: 'https://trpfrog.net/blog/takao',
      markdownUrl: 'https://trpfrog.net/blog/takao.md',
    })
  })

  it('matches every keyword against title, description and tags', async () => {
    expect((await searchPosts({ query: '徒歩 30KM' })).map(p => p.slug)).toEqual(['walk'])
    expect((await searchPosts({ query: 'rust' })).map(p => p.slug)).toEqual(['rust'])
  })

  it('filters by tag and limits the count', async () => {
    expect((await searchPosts({ tag: '徒歩', limit: 1 })).map(p => p.slug)).toEqual(['takao'])
  })
})

describe('listTags', () => {
  it('sorts tags by post count', async () => {
    expect(await listTags()).toEqual([
      { name: '徒歩', count: 2 },
      { name: '技術', count: 1 },
      { name: '登山', count: 1 },
    ])
  })
})

describe('getPost', () => {
  it('returns the summary with the Markdown body', async () => {
    expect(await getPost('rust')).toMatchObject({ slug: 'rust', markdown: '# Rust 入門' })
  })

  it('returns null for an unknown slug without fetching it', async () => {
    expect(await getPost('nope')).toBeNull()
    expect(fetchPost).not.toHaveBeenCalled()
  })
})

describe('fetchBlogPostMarkdown', () => {
  it.each(['0', 'abc', '1.5'])('returns null for the invalid page %s', async page => {
    expect(await fetchBlogPostMarkdown('rust', page)).toBeNull()
  })

  it('returns null when the post has no such page', async () => {
    vi.mocked(fetchPost).mockRejectedValueOnce(new Error('InvalidPagePositionError'))
    expect(await fetchBlogPostMarkdown('rust', '9')).toBeNull()
  })
})
