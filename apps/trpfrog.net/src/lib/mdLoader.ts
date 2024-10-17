import fs from 'fs/promises'
import * as path from 'path'

import matter from 'gray-matter'
import { z } from 'zod'

export type MarkdownWithFrontmatter<T> = {
  filename: string
  metadata: T
  content: string
}

// Zod スキーマの型が欲しいだけ
const _DataObjectSchema = z.object({
  date: z.date(),
})
type DataObjectSchemaType = typeof _DataObjectSchema

export async function readMarkdowns<Schema extends DataObjectSchemaType>(
  dirpath: string,
  schema: Schema,
): Promise<MarkdownWithFrontmatter<z.output<Schema>>[]> {
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
  return markdownsWithFrontmatter.sort((a, b) => (a.metadata.date < b.metadata.date ? 1 : -1))
}
