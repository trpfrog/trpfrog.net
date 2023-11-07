'use server'

import fs from 'fs'
import path from 'path'

import dayjs from 'dayjs'

import { retrieveAllPostSlugs } from '@blog/_lib/load'

export async function saveOnDisk(slug: string, markdown: string) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Forbidden')
  }

  if (!(await retrieveAllPostSlugs()).includes(slug)) {
    return new Response('Not found', { status: 404 })
  }

  try {
    const backupFileName = `${slug}-${dayjs(Date.now()).format(
      'YYYY-MM-DD-HH-mm-ss',
    )}.md`
    if (!fs.existsSync(path.join(process.cwd(), 'src', 'posts-backup'))) {
      await fs.promises.mkdir(path.join(process.cwd(), 'src', 'posts-backup'))
    }
    await Promise.all([
      fs.promises.writeFile(
        path.join(process.cwd(), 'src', 'posts', `${slug}.md`),
        markdown,
      ),
      fs.promises.writeFile(
        path.join(process.cwd(), 'src', 'posts-backup', backupFileName),
        markdown,
      ),
    ])
  } catch (e) {
    throw new Error('Not found')
  }
}
