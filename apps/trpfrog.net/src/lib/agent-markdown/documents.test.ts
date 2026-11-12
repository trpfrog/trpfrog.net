import { describe, expect, it } from 'vite-plus/test'

import { buildBlogIndexMarkdown, buildHomeMarkdown, buildNotFoundMarkdown } from './documents'

const posts = Array.from({ length: 12 }, (_, i) => ({
  slug: `post-${i}`,
  title: `Post ${i}`,
  date: '2026-01-01',
  description: i === 0 ? 'first' : undefined,
}))

describe('buildHomeMarkdown', () => {
  it('lists only the recent posts with markdown links', () => {
    const md = buildHomeMarkdown(posts)
    expect(md).toContain('- [Post 0](/blog/post-0.md) (2026-01-01) — first')
    expect(md).toContain('/blog/post-9.md')
    expect(md).not.toContain('/blog/post-10.md')
  })
})

describe('buildBlogIndexMarkdown', () => {
  it('lists every post', () => {
    expect(buildBlogIndexMarkdown(posts)).toContain('/blog/post-11.md')
  })
})

describe('buildNotFoundMarkdown', () => {
  it('names the missing path', () => {
    expect(buildNotFoundMarkdown('/nope')).toContain('`/nope`')
  })
})
