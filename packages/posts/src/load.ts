import * as fs from 'fs'
import * as path from 'path'

import { compareAsc, compareDesc } from 'date-fns'
import { match } from 'ts-pattern'
import { z } from 'zod'

import { BlogPost } from './blogPost.ts'
import { BlogPostBuildOption, buildBlogPost } from './buildBlogPost.ts'

const postsDirectory = path.join(process.cwd(), '..', '..', '..', 'posts')

/**
 * Read markdown from slug (without extension)
 * @param slug
 */
export function readMarkdownFromSlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const paths = [fullPath, fullPath + 'x'] // for mdx
  for (const p of paths) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, 'utf8')
    }
  }
  throw new Error(`No such file: ${fullPath}`)
}

/**
 * Read all markdown file names
 */
function readAllMarkdownFileNames() {
  const dir = fs.readdirSync(postsDirectory)
  return dir.filter(e => {
    const ext = e.split('.').slice(-1)[0]
    return ext === 'md' || ext === 'mdx'
  })
}

/**
 * Fetch blog post from slug
 * @param slug
 * @param option
 */
export async function fetchBlogPost(slug: string, option?: BlogPostBuildOption): Promise<BlogPost> {
  const fileContents = readMarkdownFromSlug(slug)
  return buildBlogPost(slug, fileContents, option)
}

const SearchOptionSchema = z
  .object({
    tag: z.string().optional(),
    order: z.enum(['asc', 'desc', 'none']).default('desc'),
  })
  .default({})

/**
 * Search blog post
 * @param searchOptions
 */
export const searchBlogPost = async (
  searchOptions?: z.input<typeof SearchOptionSchema>,
): Promise<BlogPost[]> => {
  const options = SearchOptionSchema.parse(searchOptions)
  const fileNames = readAllMarkdownFileNames()
  const allPostsData = fileNames
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '').replace(/\.md$/, '')
      const fileContents = readMarkdownFromSlug(slug)
      return buildBlogPost(slug, fileContents, { metadataOnly: true })
    })
    .filter(blogPost => !options.tag || blogPost.tags.includes(options.tag))

  return match(options.order)
    .with('asc', () => allPostsData.toSorted((a, b) => compareAsc(a.date, b.date)))
    .with('desc', () => allPostsData.toSorted((a, b) => compareDesc(a.date, b.date)))
    .with('none', () => allPostsData)
    .exhaustive()
}

export const retrieveAllPostSlugs = async (): Promise<string[]> => {
  const fileNames = readAllMarkdownFileNames()
  return fileNames.map(e => e.slice(0, e.lastIndexOf('.')))
}

export async function retrieveExistingAllTags() {
  const fileNames = readAllMarkdownFileNames()
  const nested = await Promise.all(
    fileNames
      .map(fileName => fileName.replace(/\.mdx$/, '').replace(/\.md$/, ''))
      .map(slug => fetchBlogPost(slug, { metadataOnly: true }).then(e => e.tags)),
  )
  const set = new Set(nested.flat())
  return [...set]
}
