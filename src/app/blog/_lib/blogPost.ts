import matter from 'gray-matter'
import { z } from 'zod'

import type { BlogPostOption } from '@blog/_lib/load'
import parse from '@blog/_lib/parse'
import { getReadTimeSecond } from '@blog/_lib/readTime'

export default interface BlogPost {
  title: string
  slug: string
  date: string
  updated: string
  tags: string
  description?: string
  thumbnail?: string
  readTime: number
  numberOfPhotos?: number
  held?: string
  previewContentId?: string
  isAll: boolean
  currentPage: number
  numberOfPages: number
  content: string[]
}

// YYYY-MM-DD
const zBlogDate = z.coerce.date().transform(date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`
})

export const blogFrontMatterSchema = z.object({
  title: z.string(),
  date: zBlogDate,
  updated: zBlogDate.optional(),
  held: zBlogDate.optional(),
  tags: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().url().optional(),
})

export type BlogFrontMatter = z.infer<typeof blogFrontMatterSchema>

export const buildBlogPost = (
  markdownString: string,
  option?: BlogPostOption,
): BlogPost => {
  const matterResult = matter(markdownString)
  const pagePosition = option?.pagePos1Indexed ?? -1

  const tags = (matterResult.data.tags ?? '')
    .split(',')
    .map((t: string) => t.trim())
    .join()

  const numberOfPhotos = matterResult.content
    .split('\n')
    .filter(e => e.startsWith('![')).length

  const parsedContent: string[][] = parse(matterResult.content)
  let content: string[] = []
  if (option?.all) {
    content = parsedContent
      .map((windows, idx) => {
        windows[0] = `<span id="original-page-${idx + 1}"></span>` + windows[0]
        return windows
      })
      .flat()
  } else if (pagePosition) {
    if (pagePosition > parsedContent.length) {
      throw 'Too large page position!'
    }
    content = parsedContent[pagePosition - 1]
  }

  return {
    content,
    tags,
    isAll: option?.all ?? false,
    numberOfPages: parsedContent.length,
    currentPage: pagePosition,
    readTime: getReadTimeSecond(matterResult.content),
    numberOfPhotos,
    ...matterResult.data,
  } as BlogPost
}

export const blogPostToMarkdown = (blogPost: BlogPost) => {
  const { content, ...rest } = blogPost
  const frontMatter = blogFrontMatterSchema.parse(rest)
  return matter.stringify(
    content.join('\n\n<!-- page break -->\n\n'),
    frontMatter,
  )
}
