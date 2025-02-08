import { compareAsc, compareDesc } from 'date-fns'
import { match } from 'ts-pattern'
import * as v from 'valibot'

import { BlogPost } from './blogPost.ts'

const SearchOptionSchema = v.optional(
  v.object({
    tag: v.optional(v.string()),
    order: v.optional(v.picklist(['asc', 'desc', 'none']), 'desc'),
  }),
  {},
)

export type SearchOption = v.InferInput<typeof SearchOptionSchema>

/**
 * Search blog post
 * @param posts
 * @param searchOptions
 */
export const searchBlogPost = async (
  posts: BlogPost[],
  searchOptions?: SearchOption,
): Promise<BlogPost[]> => {
  const options = v.parse(SearchOptionSchema, searchOptions)
  posts = posts.filter(blogPost => !options.tag || blogPost.tags.includes(options.tag))
  return match(options.order)
    .with('asc', () => posts.toSorted((a, b) => compareAsc(a.date, b.date)))
    .with('desc', () => posts.toSorted((a, b) => compareDesc(a.date, b.date)))
    .with('none', () => posts)
    .exhaustive()
}
