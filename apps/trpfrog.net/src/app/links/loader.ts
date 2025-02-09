import fs from 'fs/promises'
import * as path from 'path'

import { validateUnknown, InferSchemaOutput } from '@trpfrog.net/utils'
import yaml from 'js-yaml'
import * as v from 'valibot'

const MutualLinkRecordSchema = v.object({
  url: v.string(),
  ownerName: v.string(),
  twitter: v.optional(v.string()),
  github: v.optional(v.string()),
  description: v.optional(v.string()),
})

export type MutualLinkRecord = InferSchemaOutput<typeof MutualLinkRecordSchema>

export const loadMutualLinkRecords: () => Promise<MutualLinkRecord[]> = async () => {
  const yamlPath = path.join(process.cwd(), 'src', 'app', 'links', 'mutual_links.yaml')
  const yamlText = await fs.readFile(yamlPath, 'utf-8')
  const links = validateUnknown(v.array(MutualLinkRecordSchema), yaml.load(yamlText))

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
