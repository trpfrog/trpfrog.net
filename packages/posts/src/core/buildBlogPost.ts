import { validate, InferSchemaInput } from '@trpfrog.net/utils'
import { vNarrowInputType } from '@trpfrog.net/utils/valibot'
import matter from 'gray-matter'
import * as v from 'valibot'

import {
  computeReadTimeSecondFrom,
  ReadTimeOptionSchema,
} from '../time/computeReadTimeSecondFrom.ts'

import {
  BLOG_PAGE_NUMBER__1,
  BlogFrontMatterSchema,
  BlogPageNumber,
  BlogPageNumberSchema,
  BlogPost,
} from './blogPost.ts'
import { preprocess } from './preprocess.ts'

const BlogPostBuildOptionSchema = v.object({
  pagePos1Indexed: v.optional(
    vNarrowInputType<BlogPageNumber>(BlogPageNumberSchema),
    BLOG_PAGE_NUMBER__1,
  ),
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
  _options?: BlogPostBuildOption,
): BlogPost {
  const options = validate(BlogPostBuildOptionSchema, _options ?? {})

  const matterResult = matter(markdownString)

  const frontMatter = validate(BlogFrontMatterSchema, matterResult.data)

  const numberOfPhotos = matterResult.content
    .split('\n')
    .filter(e => /^(!\[)|(<img)|(image[234]?:)/.test(e)).length

  const pageContent = options?.metadataOnly
    ? []
    : preprocess(matterResult.content, options.pagePos1Indexed)

  const pageBreakRegex = /<!--+ page break --+>/g
  const numberOfPages = matterResult.content.split(pageBreakRegex).length

  if (typeof options.pagePos1Indexed === 'number' && options.pagePos1Indexed > numberOfPages) {
    throw new InvalidPagePositionError(options.pagePos1Indexed)
  }

  const post = {
    slug,
    ...frontMatter,
    content: pageContent,
    numberOfPages,
    currentPage: options.pagePos1Indexed,
    readTime: computeReadTimeSecondFrom(matterResult.content, options.readTimeOption),
    numberOfPhotos,
    previewContentId: options?.previewContentId,
    // temporary, will be overwritten below
    markdown: '',
  }
  // Compose markdown from front matter + current content
  post.markdown = blogPostToMarkdown(post)

  return post
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
