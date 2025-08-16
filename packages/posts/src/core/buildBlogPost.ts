import { validate, InferSchemaInput, tryOrElse } from '@trpfrog.net/utils'
import matter from 'gray-matter'
import * as v from 'valibot'

import {
  computeReadTimeSecondFrom,
  ReadTimeOptionSchema,
} from '../time/computeReadTimeSecondFrom.ts'

import {
  BlogFrontMatterSchema,
  BlogPageNumber,
  BlogPageNumberSchema,
  BlogPost,
} from './blogPost.ts'
import { preprocess } from './preprocess.ts'

const BlogPostBuildOptionSchema = v.object({
  pagePos1Indexed: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
  all: v.optional(v.boolean(), false),
  showPreviewCheckpoint: v.optional(v.boolean(), false),
  previewContentId: v.optional(v.string()),
  metadataOnly: v.optional(v.boolean(), false),
  readTimeOption: v.optional(ReadTimeOptionSchema),
})

export class InvalidPagePositionError extends Error {
  constructor(pagePosition: unknown) {
    super(`Invalid page position: ${pagePosition}`)
  }
}

export type BlogPostBuildOption = InferSchemaInput<typeof BlogPostBuildOptionSchema>

export function buildBlogPost(
  slug: string,
  markdownString: string,
  options?: BlogPostBuildOption,
): BlogPost {
  options = validate(BlogPostBuildOptionSchema, options ?? {})

  const matterResult = matter(markdownString)
  const pagePosition = tryOrElse(
    () => validate(BlogPageNumberSchema, options.pagePos1Indexed ?? 1),
    () => {
      throw new InvalidPagePositionError(pagePosition)
    },
  )
  const frontMatter = validate(BlogFrontMatterSchema, matterResult.data)

  const numberOfPhotos = matterResult.content
    .split('\n')
    .filter(e => /^(!\[)|(<img)|(image[234]?:)/.test(e)).length

  const pageContent = options?.metadataOnly ? [] : preprocess(matterResult.content, pagePosition)

  const pageBreakRegex = /<!--+ page break --+>/g
  const numberOfPages = matterResult.content.split(pageBreakRegex).length

  if (typeof pagePosition === 'number' && pagePosition > numberOfPages) {
    throw new InvalidPagePositionError(pagePosition)
  }

  return {
    slug,
    ...frontMatter,
    content: pageContent,
    numberOfPages,
    currentPage: pagePosition,
    readTime: computeReadTimeSecondFrom(matterResult.content, options.readTimeOption),
    numberOfPhotos,
    previewContentId: options?.previewContentId,
  }
}

export const blogPostToMarkdown = (blogPost: BlogPost) => {
  const { content, ...rest } = blogPost
  const frontMatter = {
    ...validate(BlogFrontMatterSchema, rest),
    page: blogPost.currentPage as BlogPageNumber | undefined,
  }
  if (blogPost.currentPage === 'all') {
    delete frontMatter.page
  }
  return matter.stringify(content.join('\n\n<!-- page break -->\n\n'), frontMatter)
}
