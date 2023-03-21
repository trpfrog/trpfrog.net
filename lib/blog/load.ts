import fs from 'fs'
import path from 'path'
import matter from "gray-matter";
import {getReadTimeSecond} from "./readTime";
import parse from "./parse";

export type BlogPost = {
  title: string
  slug: string
  date: string
  updated: string
  tags: string
  description?: string
  thumbnail?: string
  readTime: number
  numberOfPhotos?: number
  held?: string
  previewContentId?: string
  isAll: boolean
  currentPage: number
  numberOfPages: number
  content: string[]
}

const postsDirectory = path.join(process.cwd(), 'posts');

const getFileContents = (slug: string) => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  return fs.existsSync(fullPath)
    ? fs.readFileSync(fullPath, 'utf8')
    : fs.readFileSync(fullPath + 'x', 'utf8')
}

const fetchAllMarkdownFileNames = async () => (
  (await fs.promises.readdir(postsDirectory)).filter(e => {
    const ext = e.split('.').slice(-1)[0]
    return ext === 'md' || ext === 'mdx'
  })
)



export const fetchPastPost = async (slug: string, file_sha: string, option: any) => {
  const url = `https://raw.githubusercontent.com/TrpFrog/trpfrog.net/${file_sha}/posts/${slug}.md`
  const res = await fetch(url)
  if (res.ok) {
    return await buildBlogPost(slug, await res.text(), option)
  } else {
    return null
  }
}

export type BlogPostOption = Partial<{
  pagePos1Indexed: number
  all: boolean
  showPreviewCheckpoint?: boolean
}>

export const buildBlogPost = async (
  slug: string,
  markdownString: string,
  option?: BlogPostOption,
  previewContentId?: string
): Promise<BlogPost> => {

  const matterResult = matter(markdownString)
  const pagePosition = option?.pagePos1Indexed ?? -1

  const tags = matterResult.data.tags
    .split(',')
    .map((t: string) => t.trim())
    .concat()

  const numberOfPhotos = matterResult.content
    .split('\n')
    .filter(e => e.startsWith('!['))
    .length

  const parsedContent: string[][] = await parse(matterResult.content)
  let content: string[] = []
  if (option?.all) {
    content = parsedContent
      .map((windows, idx) => {
        windows[0] = `<span id="original-page-${idx + 1}"></span>` + windows[0]
        return windows
      })
      .flat()
  } else if (pagePosition) {
    if (pagePosition > parsedContent.length) {
      throw 'Too large page position!'
    }
    content = parsedContent[pagePosition - 1]
  }

  if (previewContentId && option?.showPreviewCheckpoint) {
    const fullPath = path.join(process.cwd(), 'data', 'preview-checkpoint.md')
    const checkpoint = fs.readFileSync(fullPath, 'utf8')
    content = [checkpoint, ...content]
  }

  return {
    slug,
    content,
    tags,
    previewContentId,
    isAll: option?.all ?? false,
    numberOfPages: parsedContent.length,
    currentPage: pagePosition,
    readTime: getReadTimeSecond(matterResult.content),
    numberOfPhotos,
    ...matterResult.data
  } as BlogPost
}

export const getPostData = async (slug: string, option?: BlogPostOption) => {
  const fileContents = getFileContents(slug)
  return await buildBlogPost(slug, fileContents, option)
}


export const getSortedPostsData = async (tag: string = '') => {
  const fileNames = await fetchAllMarkdownFileNames()
  const allPostsData = fileNames
    .map(fileName => {
      const slug = fileName
        .replace(/\.mdx$/, '')
        .replace(/\.md$/, '')
      const fileContents = getFileContents(slug)
      return {matterResult: matter(fileContents), slug}
    })
    .filter(({matterResult}) => (tag == '') || matterResult.data.tags.search(tag) != -1)
    .map(({matterResult, slug}) => {
      return {
        slug,
        readTime: getReadTimeSecond(matterResult.content),
        ...matterResult.data
      } as BlogPost
    }
    )

  const sorted = allPostsData.sort(({date: a}, {date: b}) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  });

  return JSON.parse(JSON.stringify(sorted))
}

export const getAllPostSlugs = async (): Promise<string[]> => {
  const fileNames = await fetchAllMarkdownFileNames()
  return fileNames.map(e => e.slice(0, e.lastIndexOf('.')))
}

export const getAllPostPaths = async () => {
  const slugs = await getAllPostSlugs()
  let paths = []

  for (const slug of slugs) {
    const entry = await getPostData(slug)
    for (let i = 1; i <= entry.numberOfPages; i++) {
      paths.push({params: {slug: [slug, i + ""]}})
    }
    paths.push({params: {slug: [slug]}})
    paths.push({params: {slug: [slug, 'all']}})
  }

  return paths
}

export const getAllTags = async () => {
  const fileNames = await fetchAllMarkdownFileNames()
  const nested = fileNames
    .map(fileName => fileName
      .replace(/\.mdx$/, '')
      .replace(/\.md$/, ''))
    .map(slug => getFileContents(slug))
    .map(contents => matter(contents).data.tags as string)
    .map(tags => tags.split(',').map(tag => tag.trim()))
    .flat()
  const tags = [...new Set(nested)]

  return tags.map(tag => {
    return {
      params: {
        tag
      }
    }
  })
}
