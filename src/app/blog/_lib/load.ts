import fs from 'fs'
import path from 'path'

import { BlogPostBuildOption, buildBlogPost } from '@blog/_lib/buildBlogPost'

import { BlogPost } from './blogPost'

const postsDirectory = path.join(process.cwd(), 'src', 'posts')

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

export async function fetchBlogPost(
  slug: string,
  option?: BlogPostBuildOption,
): Promise<BlogPost> {
  const fileContents = readMarkdownFromSlug(slug)
  return buildBlogPost(slug, fileContents, option)
}

export const retrieveSortedBlogPostList = async (tag: string = '') => {
  const fileNames = readAllMarkdownFileNames()
  const allPostsData = fileNames
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '').replace(/\.md$/, '')
      const fileContents = readMarkdownFromSlug(slug)
      return buildBlogPost(slug, fileContents, { noContentNeeded: true })
    })
    .filter(blogPost => tag === '' || blogPost.tags.includes(tag))

  const sorted: BlogPost[] = allPostsData.sort(({ date: _a }, { date: _b }) => {
    const a = new Date(_a)
    const b = new Date(_b)
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })

  return JSON.parse(JSON.stringify(sorted)) as BlogPost[]
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
      .map(slug =>
        fetchBlogPost(slug, { noContentNeeded: true }).then(e => e.tags),
      ),
  )
  return [...new Set(nested.flat())]
}
