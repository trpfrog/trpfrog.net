'use server'

import { BlogPost, InvalidPagePositionError } from '@trpfrog.net/posts'
import { validateUnknown } from '@trpfrog.net/utils'
import { notFound } from 'next/navigation'
import { match } from 'ts-pattern'
import * as v from 'valibot'

import { BlogMarkdown } from '@blog/_components/BlogMarkdown'

const pageNumberSchema = v.fallback(
  v.union([v.pipe(v.number(), v.integer(), v.minValue(1)), v.literal('all')]),
  1,
)

export async function renderBlog(slug: string, page?: number | 'all') {
  page = validateUnknown(pageNumberSchema, page)
  try {
    const { readBlogPost } = await import('@trpfrog.net/posts/fs')
    const entry: BlogPost = await match(page)
      .with('all', () => readBlogPost(slug, { all: true }))
      .otherwise(page => readBlogPost(slug, { pagePos1Indexed: page }))
    return <BlogMarkdown entry={entry} />
  } catch (e) {
    if (e instanceof InvalidPagePositionError) {
      return notFound()
    }
  }
}
