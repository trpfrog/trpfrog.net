import dayjs from 'dayjs'
import { z } from 'zod'

// YYYY-MM-DD
const BlogDateSchema = z.coerce.date().transform(date => {
  return dayjs(date).format('YYYY-MM-DD')
})

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
  date: BlogDateSchema.default(new Date(0)),
  updated: BlogDateSchema.optional(),
  held: BlogDateSchema.optional(),
  tags: BlogTagSchema,
  description: z.string().optional(),
  thumbnail: z.string().url().optional(),
})

export type BlogFrontMatter = z.infer<typeof blogFrontMatterSchema>

export interface BlogPost extends BlogFrontMatter {
  slug: string
  readTime: number
  numberOfPhotos?: number
  held?: string
  previewContentId?: string
  isAll: boolean
  currentPage: number
  numberOfPages: number
  content: string[]
}
