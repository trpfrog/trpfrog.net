import microCMS from '@/lib/microCMS'

import BlogPost from './blogPost'
import { BlogPostOption, buildBlogPost } from './load'

export type ErrorablePost = BlogPost & {
  isError: boolean
}

const errorArticle = {
  isError: true,
  title: 'ERROR!',
  slug: 'slug',
  date: '2000-10-17',
  updated: '2020-10-17',
  tags: 'test',
  isAll: false,
  readTime: 100,
  currentPage: 1,
  numberOfPages: 1,
  content: ['Error has occurred'],
} satisfies ErrorablePost

export const createErrorArticle = (errTitle: string): ErrorablePost => {
  let ret = { ...errorArticle }
  ret.title = 'ERR: ' + errTitle
  return ret
}

export const getPreviewPostData = async (
  contentId: string,
  option?: BlogPostOption,
) => {
  const data = await microCMS
    .get({
      endpoint: 'blog-preview',
      contentId,
    })
    .catch(() => ({}))

  if (!(data?.md && data?.slug)) {
    return createErrorArticle('Invalid content ID')
  }

  return await buildBlogPost(data!.slug, data!.md, option, contentId)
}
