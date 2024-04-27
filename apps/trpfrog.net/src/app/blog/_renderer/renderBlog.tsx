'use server'

import { BlogPost, fetchBlogPost } from '@trpfrog.net/posts'

import { BlogMarkdown } from '@blog/_renderer/BlogMarkdown'

export async function renderBlog(slug: string, page?: string) {
  const entry: BlogPost = await fetchBlogPost(slug, {
    pagePos1Indexed: page ? parseInt(page, 10) : 1,
    all: page === 'all',
  })
  return <BlogMarkdown entry={entry} />
}
