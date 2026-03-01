import * as fs from 'fs'
import * as path from 'path'

import { BlogPost } from '../core'
import { BlogPostBuildOption, buildBlogPost } from '../core/buildBlogPost.ts'
import { getPostSlugFromPath, getPostsDirectory, resolvePostPath } from '../core/paths.ts'
import { searchBlogPost as search, SearchOption } from '../core/search.ts'

const postsDirectory = getPostsDirectory()

export { getPostSlugFromPath, getPostsDirectory, resolvePostPath }

/**
 * Read markdown from slug (without extension)
 * @param slug
 */
export function readMarkdownFromSlug(slug: string): Promise<string> {
  const resolvedPath = resolvePostPath(slug)
  if (!resolvedPath) {
    return Promise.reject(new Error(`No such file: ${path.join(postsDirectory, `${slug}.md`)}`))
  }
  return fs.promises.readFile(resolvedPath, 'utf8')
}

/**
 * Fetch blog post from slug
 * @param slug
 * @param option
 */
export async function readBlogPost(slug: string, option?: BlogPostBuildOption): Promise<BlogPost> {
  const fileContents = await readMarkdownFromSlug(slug)
  return buildBlogPost(slug, fileContents, option)
}

/**
 * Read all markdown file names
 */
async function readAllMarkdownFileNames(): Promise<string[]> {
  return fs.promises.readdir(postsDirectory).then(dir => dir.filter(e => path.extname(e) === '.md'))
}

/**
 * Read all slugs
 */
export async function readAllSlugs(): Promise<string[]> {
  const fileNames = await readAllMarkdownFileNames()
  return fileNames.map(e => e.slice(0, e.lastIndexOf('.')))
}

/**
 * Search blog post
 * @param options
 */
export async function readAllBlogPosts(options?: SearchOption): Promise<BlogPost[]> {
  const fileNames = await readAllMarkdownFileNames()
  const allPostsData = await Promise.all(
    fileNames.map(async fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fileContents = await readMarkdownFromSlug(slug)
      return buildBlogPost(slug, fileContents, { metadataOnly: true })
    }),
  )
  return search(allPostsData, options)
}

/**
 * Retrieve existing all tags
 */
export async function retrieveExistingAllTags(): Promise<string[]> {
  const fileNames = await readAllMarkdownFileNames()
  const nested = await Promise.all(
    fileNames
      .map(fileName => fileName.replace(/\.md$/, ''))
      .map(slug => readBlogPost(slug, { metadataOnly: true }).then(e => e.tags)),
  )
  const set = new Set(nested.flat())
  return [...set]
}
