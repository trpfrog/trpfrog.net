'use server'

import { BlogPost } from '@trpfrog.net/posts'
import { match } from 'ts-pattern'

import { BlogMarkdown } from '@blog/_renderer/BlogMarkdown'

export async function renderBlog(slug: string, page?: string) {
  const { readBlogPost } = await import('@trpfrog.net/posts/fs')
  const entry: BlogPost = await match(page)
    .with('all', () => readBlogPost(slug, { all: true }))
    .otherwise(() => readBlogPost(slug, { pagePos1Indexed: parseInt(page || '1', 10) }))
  return <BlogMarkdown entry={entry} />
}
