import matter from 'gray-matter'

import { blogFrontMatterSchema, BlogPost } from '@blog/_lib/blogPost'
import { computeReadTimeSecondFrom } from '@blog/_lib/computeReadTimeSecondFrom'
import { preprocessMarkdown } from '@blog/_lib/preprocessMarkdown'

export type BlogPostBuildOption = {
  pagePos1Indexed?: number
  all?: boolean
  showPreviewCheckpoint?: boolean
  previewContentId?: string
  noContentNeeded?: boolean
}

export function buildBlogPost(
  slug: string,
  markdownString: string,
  option?: BlogPostBuildOption,
): BlogPost {
  const matterResult = matter(markdownString)
  const pagePosition = option?.pagePos1Indexed ?? 1
  const frontMatter = blogFrontMatterSchema.parse(matterResult.data)

  const numberOfPhotos = matterResult.content
    .split('\n')
    .filter(e => /^(!\[)|(<img)|(image[234]?:)/.test(e)).length

  const pageContent = option?.noContentNeeded
    ? []
    : preprocessMarkdown(matterResult.content, {
        concatenateAllPages: option?.all,
        pageIdx1Indexed: pagePosition,
      })

  const pageBreakRegex = /<!--+ page break --+>/g
  const numberOfPages = matterResult.content.split(pageBreakRegex).length

  return {
    slug,
    ...frontMatter,
    content: pageContent,
    isAll: option?.all ?? false,
    numberOfPages,
    currentPage: pagePosition,
    readTime: computeReadTimeSecondFrom(matterResult.content),
    numberOfPhotos,
    previewContentId: option?.previewContentId,
  }
}

export const blogPostToMarkdown = (blogPost: BlogPost) => {
  const { content, ...rest } = blogPost
  const frontMatter = blogFrontMatterSchema.parse(rest)
  return matter.stringify(
    content.join('\n\n<!-- page break -->\n\n'),
    frontMatter,
  )
}
