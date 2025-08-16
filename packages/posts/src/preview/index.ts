import { validateUnknown, InferSchemaOutput } from '@trpfrog.net/utils'
import { createClient } from 'microcms-js-sdk'
import * as v from 'valibot'

import { BlogPageNumber, BlogPost } from '../core'
import { BlogPostBuildOption, buildBlogPost } from '../core/buildBlogPost.ts'

export type ErrorablePost = BlogPost & {
  isError: boolean
}

const errorArticle = {
  isError: true,
  title: 'ERROR!',
  slug: 'slug',
  date: '2000-10-17',
  updated: '2020-10-17',
  tags: ['test'],
  readTime: 100,
  currentPage: 1 as BlogPageNumber,
  numberOfPages: 1,
  content: ['Error has occurred'],
} satisfies ErrorablePost

export function createErrorArticle(errTitle: string): ErrorablePost {
  const ret = { ...errorArticle }
  ret.title = 'ERR: ' + errTitle
  return ret
}

const MicroCMSBlogPostSchema = v.object({
  md: v.string(),
  slug: v.string(),
})

export type PreviewPostClient = (
  contentId: string,
) => Promise<InferSchemaOutput<typeof MicroCMSBlogPostSchema>>

export function createPreviewClient(args: {
  apiKey: string
  serviceDomain: string
  endpoint: string
}): PreviewPostClient {
  const client = createClient({
    apiKey: args.apiKey,
    serviceDomain: args.serviceDomain,
  })
  return async (contentId: string) => {
    const data = await client.get({
      endpoint: args.endpoint,
      contentId,
    })
    return validateUnknown(MicroCMSBlogPostSchema, data)
  }
}

/**
 * Fetch blog post from microCMS
 * @param contentId
 * @param option
 */
export async function fetchPreviewBlogPost(
  client: PreviewPostClient,
  contentId: string,
  option?: BlogPostBuildOption,
) {
  try {
    const { md, slug } = await client(contentId)
    return buildBlogPost(slug, md, {
      ...option,
      previewContentId: contentId,
    })
  } catch {
    return createErrorArticle('Invalid content ID')
  }
}
