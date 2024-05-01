import { compareAsc, compareDesc } from 'date-fns'
import { match } from 'ts-pattern'
import { z } from 'zod'

import { BlogPost } from './blogPost.ts'

const SearchOptionSchema = z
  .object({
    tag: z.string().optional(),
    order: z.enum(['asc', 'desc', 'none']).default('desc'),
  })
  .default({})

export type SearchOption = z.input<typeof SearchOptionSchema>

/**
 * Search blog post
 * @param posts
 * @param searchOptions
 */
export const searchBlogPost = async (
  posts: BlogPost[],
  searchOptions?: SearchOption,
): Promise<BlogPost[]> => {
  const options = SearchOptionSchema.parse(searchOptions)
  posts = posts.filter(blogPost => !options.tag || blogPost.tags.includes(options.tag))
  return match(options.order)
    .with('asc', () => posts.toSorted((a, b) => compareAsc(a.date, b.date)))
    .with('desc', () => posts.toSorted((a, b) => compareDesc(a.date, b.date)))
    .with('none', () => posts)
    .exhaustive()
}
