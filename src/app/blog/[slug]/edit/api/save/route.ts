import fs from 'fs'
import path from 'path'

import { retrieveAllPostSlugs } from '@blog/_lib/load'

type Context = {
  params: {
    slug: string
  }
}

export async function POST(req: Request, context: Context) {
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Forbidden', { status: 403 })
  }

  const slug = context.params.slug
  if (!(await retrieveAllPostSlugs()).includes(slug)) {
    return new Response('Not found', { status: 404 })
  }

  const body = await req.text()

  try {
    fs.writeFileSync(
      path.join(process.cwd(), 'src', 'posts', slug + '.md'),
      body,
    )
    return new Response('Saved')
  } catch (e) {
    return new Response('Not found', { status: 404 })
  }
}
