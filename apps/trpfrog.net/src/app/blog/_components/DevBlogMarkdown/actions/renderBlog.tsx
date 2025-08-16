'use server'

import {
  BlogPost,
  InvalidPagePositionError,
  BlogPageNumber,
  BLOG_PAGE_NUMBER__1,
} from '@trpfrog.net/posts'
import { notFound } from 'next/navigation'
import { match } from 'ts-pattern'

import { BlogMarkdown } from '@blog/_components/BlogMarkdown'

export async function renderBlog(slug: string, page: BlogPageNumber = BLOG_PAGE_NUMBER__1) {
  try {
    const { readBlogPost } = await import('@trpfrog.net/posts/fs')
    const entry: BlogPost = await match(page).otherwise(page =>
      readBlogPost(slug, { pagePos1Indexed: page }),
    )
    return <BlogMarkdown entry={entry} />
  } catch (e) {
    if (e instanceof InvalidPagePositionError) {
      return notFound()
    }
  }
}
