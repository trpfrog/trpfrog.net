/**
 * Add image size to articles in src/posts/*.md
 * ![alt](src "title")
 * => ![alt](src?w=800&h=600 "title")
 *
 * $ bun tools/addImageSizeToArticle.ts
 */

import { promises as fs } from 'fs'
import * as path from 'path'

import { validateUnknown } from '@trpfrog.net/utils'
import * as v from 'valibot'

import { cloudinary } from '@/lib/cloudinary'
import { getPureCloudinaryPath } from '@/lib/cloudinaryUtils.ts'

const postsDir = path.join(process.cwd(), 'src/posts')

const CloudinaryResponseSchema = v.object({
  resources: v.array(
    v.object({
      public_id: v.string(),
      width: v.number(),
      height: v.number(),
    }),
  ),
})

const main = async () => {
  const files: `${string}.md`[] = ['_sugadaira-travel.md']
  for (const file of files) {
    if (!file.endsWith('.md')) continue

    const slug = path.basename(file).replace(/\.md$/, '').replace(/^_/, '')
    console.log(slug)

    const sizeDict: Record<
      string,
      {
        size: { width: number; height: number }
        public_id: string
      }
    > = {}

    // fetch image size
    const searchResult: v.InferOutput<typeof CloudinaryResponseSchema> = await cloudinary.search
      .expression(`folder=blog/${slug}`)
      .max_results(500)
      .execute()
      .then((res: unknown) => validateUnknown(CloudinaryResponseSchema, res))

    searchResult.resources.forEach(image => {
      const src = '/' + image.public_id
      sizeDict[src] = {
        size: {
          width: image.width,
          height: image.height,
        },
        public_id: image.public_id,
      }
    })

    const filePath = path.join(postsDir, file)
    const content = await fs.readFile(filePath, 'utf-8')
    const lines = content.split('\n')
    const newLines: string[] = []
    for (const line of lines) {
      if (line.startsWith('![')) {
        const regex = /!\[(.*?)\]\((.*?)\s*(?:"(.*?)")?\)/
        const match = line.match(regex)

        if (!match) {
          newLines.push(line)
          continue
        }

        const src = match[2]
        const purePath = getPureCloudinaryPath(src).split('?')[0]

        const width = sizeDict[purePath]?.size?.width
        const height = sizeDict[purePath]?.size?.height

        newLines.push(line.replace(src, purePath + `?w=${width}&h=${height}`))
      } else {
        newLines.push(line)
      }
    }
    await fs.writeFile(filePath, newLines.join('\n'))
  }
}

main()
