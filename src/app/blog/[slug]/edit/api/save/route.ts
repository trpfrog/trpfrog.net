import fs from 'fs'
import path from 'path'

import dayjs from 'dayjs'

import { retrieveAllPostSlugs } from '@blog/_lib/load'

type Context = {
  params: {
    slug: string
  }
}

export async function POST(req: Request, context: Context) {
  console.log('start saving')
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Forbidden', { status: 403 })
  }

  const slug = context.params.slug
  if (!(await retrieveAllPostSlugs()).includes(slug)) {
    return new Response('Not found', { status: 404 })
  }

  const body = await req.text()
  try {
    const backupFileName = `${slug}-${dayjs(Date.now()).format(
      'YYYY-MM-DD-HH-mm-ss',
    )}.md`
    if (!fs.existsSync(path.join(process.cwd(), 'src', 'posts-backup'))) {
      await fs.promises.mkdir(path.join(process.cwd(), 'src', 'posts-backup'))
    }
    await Promise.all([
      fs.promises
        .writeFile(path.join(process.cwd(), 'src', 'posts', `${slug}.md`), body)
        .then(() => console.log('saved')),
      fs.promises.writeFile(
        path.join(process.cwd(), 'src', 'posts-backup', backupFileName),
        body,
      ),
    ])
    return new Response('Saved')
  } catch (e) {
    return new Response('Not found', { status: 404 })
  }
}
