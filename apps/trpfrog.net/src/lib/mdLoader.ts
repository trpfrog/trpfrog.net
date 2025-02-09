import fs from 'fs/promises'
import * as path from 'path'

import { StandardSchemaV1 } from '@standard-schema/spec'
import { validateUnknown } from '@trpfrog.net/utils'
import matter from 'gray-matter'
export type MarkdownWithFrontmatter<T> = {
  filename: string
  metadata: T
  content: string
}

export async function readMarkdowns<S extends StandardSchemaV1<unknown, { date: Date }>>(
  dirpath: string,
  schema: S,
): Promise<MarkdownWithFrontmatter<StandardSchemaV1.InferOutput<S>>[]> {
  const files = await fs.readdir(dirpath)
  const markdowns = files.filter(file => path.extname(file) === '.md')
  const markdownsWithFrontmatter = await Promise.all(
    markdowns.map(async filename => {
      const fileContent = await fs.readFile(path.join(dirpath, filename), 'utf8')
      const matterResult = matter(fileContent)
      return {
        filename,
        metadata: validateUnknown(schema, matterResult.data),
        content: matterResult.content,
      }
    }),
  )
  return markdownsWithFrontmatter.sort((a, b) => (a.metadata.date < b.metadata.date ? 1 : -1))
}
