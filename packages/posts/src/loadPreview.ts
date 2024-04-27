import { z } from 'zod'

import { BlogPost } from './blogPost.ts'
import { BlogPostBuildOption, buildBlogPost } from './buildBlogPost.ts'
import { microCMS } from './utils/microCMS.ts'

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
  isAll: false,
  readTime: 100,
  currentPage: 1,
  numberOfPages: 1,
  content: ['Error has occurred'],
} satisfies ErrorablePost

export function createErrorArticle(errTitle: string): ErrorablePost {
  let ret = { ...errorArticle }
  ret.title = 'ERR: ' + errTitle
  return ret
}

const MicroCMSBlogPostSchema = z.object({
  md: z.string(),
  slug: z.string(),
})

/**
 * Fetch blog post from microCMS
 * @param contentId
 * @param option
 */
export async function fetchPreviewBlogPost(contentId: string, option?: BlogPostBuildOption) {
  const data = await microCMS
    .get({
      endpoint: 'blog-preview',
      contentId,
    })
    .catch(() => ({}))

  try {
    const { md, slug } = MicroCMSBlogPostSchema.parse(data)
    return buildBlogPost(slug, md, {
      ...option,
      previewContentId: contentId,
    })
  } catch {
    return createErrorArticle('Invalid content ID')
  }
}
