import * as fs from 'fs'
import * as path from 'path'

import { BlogPost } from '../core'
import { BlogPostBuildOption, buildBlogPost } from '../core/buildBlogPost.ts'
import { searchBlogPost as search, SearchOption } from '../core/search.ts'

const postsDirectory = path.join(process.cwd(), '..', '..', 'posts')

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
 * Fetch blog post from slug
 * @param slug
 * @param option
 */
export async function readBlogPost(slug: string, option?: BlogPostBuildOption): Promise<BlogPost> {
  const fileContents = readMarkdownFromSlug(slug)
  return buildBlogPost(slug, fileContents, option)
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
 * Read all slugs
 */
export async function readAllSlugs(): Promise<string[]> {
  const fileNames = readAllMarkdownFileNames()
  return fileNames.map(e => e.slice(0, e.lastIndexOf('.')))
}

/**
 * Search blog post
 * @param options
 */
export async function readAllBlogPosts(options?: SearchOption): Promise<BlogPost[]> {
  const fileNames = readAllMarkdownFileNames()
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '').replace(/\.md$/, '')
    const fileContents = readMarkdownFromSlug(slug)
    return buildBlogPost(slug, fileContents, { metadataOnly: true })
  })

  return search(allPostsData, options)
}

/**
 * Retrieve existing all tags
 */
export async function retrieveExistingAllTags(): Promise<string[]> {
  const fileNames = readAllMarkdownFileNames()
  const nested = await Promise.all(
    fileNames
      .map(fileName => fileName.replace(/\.mdx$/, '').replace(/\.md$/, ''))
      .map(slug => readBlogPost(slug, { metadataOnly: true }).then(e => e.tags)),
  )
  const set = new Set(nested.flat())
  return [...set]
}
