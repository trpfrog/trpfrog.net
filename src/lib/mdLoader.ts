import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'

import Utils from './utils'

type DateObject = { date: `${number}/${number}/${number}` }

type MarkdownWithFrontmatter<T> = {
  filename: string
  metadata: T
  content: string
}

export default async function readMarkdowns<T extends DateObject>(
  dirpath: string,
): Promise<MarkdownWithFrontmatter<T>[]> {
  const files = await fs.readdir(dirpath)
  const markdowns = files.filter(file => {
    return path.extname(file) === '.md'
  })
  const markdownsWithFrontmatter = await Promise.all(
    markdowns.map(async filename => {
      const file = await fs.readFile(path.join(dirpath, filename), 'utf8')
      const matterResult = matter(file)
      return {
        filename,
        metadata: matterResult.data,
        content: matterResult.content,
      } as MarkdownWithFrontmatter<T>
    }),
  )
  return markdownsWithFrontmatter.sort((a, b) =>
    Utils.sortWithDates(a.metadata.date, b.metadata.date),
  )
}
