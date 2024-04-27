import { format } from 'date-fns'
import { z } from 'zod'

// YYYY-MM-DD
const BlogDateSchema = z.coerce.date().transform(date => format(date, 'YYYY-MM-DD'))

const BlogTagSchema = z
  .string()
  .array()
  .default([])
  .or(
    z.string().transform(str => {
      if (str === '') {
        return []
      }
      return str.split(',').map(e => e.trim())
    }),
  )

export const blogFrontMatterSchema = z.object({
  title: z.string().default(''),
  subtitle: z.string().optional(),
  date: BlogDateSchema.default(new Date(0)),
  updated: BlogDateSchema.optional(),
  held: BlogDateSchema.optional(),
  tags: BlogTagSchema,
  description: z.string().optional(),
  thumbnail: z.string().url().optional(),
})

export const BlogPostSchema = blogFrontMatterSchema.extend({
  content: z.array(z.string()),
  slug: z.string(),
  readTime: z.number(),
  numberOfPhotos: z.number().optional(),
  previewContentId: z.string().optional(),
  isAll: z.boolean(),
  currentPage: z.number(),
  numberOfPages: z.number(),
})

export type BlogFrontMatter = z.infer<typeof blogFrontMatterSchema>
export type BlogPost = z.infer<typeof BlogPostSchema>
