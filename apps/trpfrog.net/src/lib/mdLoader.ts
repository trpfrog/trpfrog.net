import fs from 'fs/promises'
import * as path from 'path'

import matter from 'gray-matter'

export type MarkdownWithFrontmatter<T> = {
  filename: string
  metadata: T
  content: string
}

export async function readMarkdowns<V extends (obj: unknown) => { date: Date }>(
  dirpath: string,
  validator: V,
): Promise<MarkdownWithFrontmatter<ReturnType<V>>[]> {
  const files = await fs.readdir(dirpath)
  const markdowns = files.filter(file => path.extname(file) === '.md')
  const markdownsWithFrontmatter = await Promise.all(
    markdowns.map(async filename => {
      const fileContent = await fs.readFile(path.join(dirpath, filename), 'utf8')
      const matterResult = matter(fileContent)
      return {
        filename,
        metadata: validator(matterResult.data) as ReturnType<V>,
        content: matterResult.content,
      }
    }),
  )
  return markdownsWithFrontmatter.sort((a, b) => (a.metadata.date < b.metadata.date ? 1 : -1))
}
