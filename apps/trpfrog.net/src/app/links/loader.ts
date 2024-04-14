import fs from 'fs/promises'
import * as path from 'path'

import yaml from 'js-yaml'
import { z } from 'zod'

const MutualLinkRecordSchema = z.object({
  url: z.string(),
  ownerName: z.string(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  description: z.string().optional(),
})

export type MutualLinkRecord = z.infer<typeof MutualLinkRecordSchema>

export const loadMutualLinkRecords: () => Promise<
  MutualLinkRecord[]
> = async () => {
  const yamlPath = path.join(
    process.cwd(),
    'src',
    'app',
    'links',
    'mutual_links.yaml',
  )
  const yamlText = await fs.readFile(yamlPath, 'utf-8')
  const links = MutualLinkRecordSchema.array().parse(yaml.load(yamlText))

  return links.sort(({ ownerName: a }, { ownerName: b }) => {
    if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    } else {
      return 0
    }
  })
}
