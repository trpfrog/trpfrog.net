'use server'

import {
  BlogPost,
  InvalidPagePositionError,
  BlogPageNumber,
  BLOG_PAGE_NUMBER__1,
} from '@trpfrog.net/posts'
import { notFound } from 'next/navigation'

import { BlogMarkdown } from '@blog/_components/BlogMarkdown'
import { fetchPost } from '@blog/rpc'

export async function renderBlog(slug: string, page: BlogPageNumber = BLOG_PAGE_NUMBER__1) {
  try {
    const entry: BlogPost = await fetchPost(slug, page)
    return <BlogMarkdown entry={entry} />
  } catch (e) {
    if (e instanceof InvalidPagePositionError) {
      return notFound()
    }
  }
}
