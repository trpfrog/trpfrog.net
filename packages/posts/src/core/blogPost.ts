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
  isAll: v.boolean(),
  currentPage: v.number(),
  numberOfPages: v.number(),
})

export type BlogFrontMatter = v.InferOutput<typeof BlogFrontMatterSchema>
export type BlogPost = v.InferOutput<typeof BlogPostSchema>
