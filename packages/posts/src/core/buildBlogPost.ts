import matter from 'gray-matter'
import { z } from 'zod'

import {
  computeReadTimeSecondFrom,
  ReadTimeOptionSchema,
} from '../time/computeReadTimeSecondFrom.ts'

import { blogFrontMatterSchema, BlogPost } from './blogPost.ts'
import { preprocess } from './preprocess.ts'

const BlogPostBuildOptionSchema = z.object({
  pagePos1Indexed: z.number().int().min(1).optional(),
  all: z.boolean().default(false),
  showPreviewCheckpoint: z.boolean().default(false),
  previewContentId: z.string().optional(),
  metadataOnly: z.boolean().default(false),
  readTimeOption: ReadTimeOptionSchema.optional(),
})

export class InvalidPagePositionError extends Error {
  constructor(pagePosition: number) {
    super(`Invalid page position: ${pagePosition}`)
  }
}

export type BlogPostBuildOption = z.input<typeof BlogPostBuildOptionSchema>

export function buildBlogPost(
  slug: string,
  markdownString: string,
  options?: BlogPostBuildOption,
): BlogPost {
  options = BlogPostBuildOptionSchema.parse(options ?? {})

  const matterResult = matter(markdownString)
  const pagePosition = options.pagePos1Indexed ?? 1
  const frontMatter = blogFrontMatterSchema.parse(matterResult.data)

  const numberOfPhotos = matterResult.content
    .split('\n')
    .filter(e => /^(!\[)|(<img)|(image[234]?:)/.test(e)).length

  const pageContent = options?.metadataOnly
    ? []
    : preprocess(matterResult.content, {
        concatenateAllPages: options?.all,
        pageIdx1Indexed: pagePosition,
      })

  const pageBreakRegex = /<!--+ page break --+>/g
  const numberOfPages = matterResult.content.split(pageBreakRegex).length

  if (pagePosition > numberOfPages) {
    throw new InvalidPagePositionError(pagePosition)
  }

  return {
    slug,
    ...frontMatter,
    content: pageContent,
    isAll: options?.all ?? false,
    numberOfPages,
    currentPage: pagePosition,
    readTime: computeReadTimeSecondFrom(matterResult.content, options.readTimeOption),
    numberOfPhotos,
    previewContentId: options?.previewContentId,
  }
}

export const blogPostToMarkdown = (blogPost: BlogPost) => {
  const { content, ...rest } = blogPost
  const frontMatter = blogFrontMatterSchema.parse(rest)
  return matter.stringify(content.join('\n\n<!-- page break -->\n\n'), frontMatter)
}
