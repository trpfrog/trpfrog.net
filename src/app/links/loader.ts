import fs from 'fs/promises'
import path from 'path'

import yaml from 'js-yaml'

export type MutualLinkRecord = {
  url: string
  siteName: string
  ownerName: string
  twitterId: string
  description: string
}

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
  const links = yaml.load(yamlText) as MutualLinkRecord[]

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
