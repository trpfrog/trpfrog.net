import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'
import { z } from 'zod'

export type MarkdownWithFrontmatter<T> = {
  filename: string
  metadata: T
  content: string
}

export async function readMarkdowns<T extends { date: Date }>(
  dirpath: string,
  schema: z.Schema<T>,
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
        metadata: schema.parse(matterResult.data),
        content: matterResult.content,
      } as const
    }),
  )
  return markdownsWithFrontmatter.sort((a, b) =>
    a.metadata.date < b.metadata.date ? 1 : -1,
  )
}
