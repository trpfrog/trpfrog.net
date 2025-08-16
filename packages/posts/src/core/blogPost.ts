import { InferSchemaOutput } from '@trpfrog.net/utils'
import { format } from 'date-fns'
import * as v from 'valibot'

// YYYY-MM-DD
const BlogDateSchema = v.pipe(
  v.union([v.string(), v.number(), v.date()]),
  v.transform(date => format(date, 'yyyy-MM-dd')),
)

const BlogTagSchema = v.union([
  v.array(v.string()),
  v.pipe(
    v.string(),
    v.transform(str => {
      if (str === '') {
        return []
      }
      return str.split(',').map(e => e.trim())
    }),
  ),
])

// 1以上の整数または 'all' であることを検証する
export const BlogPageNumberSchema = v.pipe(
  v.union([
    v.pipe(v.number(), v.integer(), v.minValue(1)),
    v.pipe(
      v.string(),
      // 小数点の入った文字列等は許可しない
      v.check(str => /^[1-9][0-9]*$/.test(str), 'Must be an integer string'),
      v.transform(str => parseInt(str, 10)),
    ),
    v.literal('all'),
  ]),
  v.brand('@trpfrog.net/utils/BlogPageNumber'),
)
export type BlogPageNumber = InferSchemaOutput<typeof BlogPageNumberSchema>

export const BlogFrontMatterSchema = v.object({
  title: v.optional(v.string(), ''),
  subtitle: v.optional(v.string()),
  date: v.optional(BlogDateSchema, format(new Date(0), 'yyyy-MM-dd')),
  updated: v.optional(BlogDateSchema),
  held: v.optional(BlogDateSchema),
  tags: v.optional(BlogTagSchema, []),
  description: v.optional(v.string()),
  thumbnail: v.optional(v.pipe(v.string(), v.url())),
})

export const BlogPostSchema = v.object({
  ...BlogFrontMatterSchema.entries,
  content: v.array(v.string()),
  slug: v.string(),
  readTime: v.number(),
  numberOfPhotos: v.optional(v.number()),
  previewContentId: v.optional(v.string()),
  currentPage: BlogPageNumberSchema,
  numberOfPages: v.number(),
})

export type BlogFrontMatter = InferSchemaOutput<typeof BlogFrontMatterSchema>
export type BlogPost = InferSchemaOutput<typeof BlogPostSchema>
