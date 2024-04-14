/**
 * Add image size to articles in src/posts/*.md
 * ![alt](src "title")
 * => ![alt](src?w=800&h=600 "title")
 *
 * $ bun tools/addImageSizeToArticle.ts
 */

import { promises as fs } from 'fs'
import * as path from 'path'

import { cloudinary } from '@/lib/cloudinary'

import { getPureCloudinaryPath } from '@blog/_lib/cloudinaryUtils'

const postsDir = path.join(process.cwd(), 'src/posts')

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
    const searchResult = await cloudinary.search
      .expression(`folder=blog/${slug}`)
      .max_results(500)
      .execute()

    searchResult.resources.forEach((image: any) => {
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
    const newLines = []
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
