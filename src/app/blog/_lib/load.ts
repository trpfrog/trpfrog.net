import fs from 'fs'
import path from 'path'

import { BlogPost, BlogPostBuildOption, buildBlogPost } from './blogPost'

const postsDirectory = path.join(process.cwd(), 'src', 'posts')

const getFileContents = (slug: string) => {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  return fs.existsSync(fullPath)
    ? fs.readFileSync(fullPath, 'utf8')
    : fs.readFileSync(fullPath + 'x', 'utf8')
}

const fetchAllMarkdownFileNames = async () =>
  (await fs.promises.readdir(postsDirectory)).filter(e => {
    const ext = e.split('.').slice(-1)[0]
    return ext === 'md' || ext === 'mdx'
  })

export async function fetchBlogPost(
  slug: string,
  option?: BlogPostBuildOption,
): Promise<BlogPost> {
  const fileContents = getFileContents(slug)
  return buildBlogPost(slug, fileContents, option)
}

export const getSortedPostsData = async (tag: string = '') => {
  const fileNames = await fetchAllMarkdownFileNames()
  const allPostsData = fileNames
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '').replace(/\.md$/, '')
      const fileContents = getFileContents(slug)
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

export const getAllPostSlugs = async (): Promise<string[]> => {
  const fileNames = await fetchAllMarkdownFileNames()
  return fileNames.map(e => e.slice(0, e.lastIndexOf('.')))
}

export const getAllTags = async () => {
  const fileNames = await fetchAllMarkdownFileNames()
  const nested = await Promise.all(
    fileNames
      .map(fileName => fileName.replace(/\.mdx$/, '').replace(/\.md$/, ''))
      .map(slug =>
        fetchBlogPost(slug, { noContentNeeded: true }).then(e => e.tags),
      ),
  )
  const tags = [...new Set(nested.flat())]

  return tags.map(tag => {
    return {
      params: {
        tag,
      },
    }
  })
}
