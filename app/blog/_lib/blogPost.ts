import matter from "gray-matter";
import parse from "@blog/_lib/parse";
import {getReadTimeSecond} from "@blog/_lib/readTime";
import type {BlogPostOption} from "@blog/_lib/load";

type BlogPost = {
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

export default BlogPost

export const buildBlogPost = (
  markdownString: string,
  option?: BlogPostOption,
): BlogPost => {

  const matterResult = matter(markdownString)
  const pagePosition = option?.pagePos1Indexed ?? -1

  const tags = (matterResult.data.tags ?? '')
    .split(',')
    .map((t: string) => t.trim())
    .concat()

  const numberOfPhotos = matterResult.content
    .split('\n')
    .filter(e => e.startsWith('!['))
    .length

  const parsedContent: string[][] = parse(matterResult.content)
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

  return {
    content,
    tags,
    isAll: option?.all ?? false,
    numberOfPages: parsedContent.length,
    currentPage: pagePosition,
    readTime: getReadTimeSecond(matterResult.content),
    numberOfPhotos,
    ...matterResult.data
  } as BlogPost
}

