import fs from 'fs'
import path from 'path'
import {getAllPostSlugs} from "@blog/_lib/load";

export async function GET(req: Request) {
  const slug = req.headers.get('x-blog-slug')
  if (!slug) {
    return new Response('Missing x-blog-slug header', {status: 400})
  }

  if (!(await getAllPostSlugs()).includes(slug)) {
    return new Response('Not found', {status: 404})
  }

  const md = fs.readFileSync(path.join(process.cwd(), 'posts', slug + '.md'), 'utf-8')

  try {
    return new Response(md)
  } catch (e) {
    return new Response('Not found', {status: 404})
  }
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Forbidden', {status: 403})
  }

  const slug = req.headers.get('x-blog-slug')
  if (!slug) {
    return new Response('Missing x-blog-slug header', {status: 400})
  }
  if (!(await getAllPostSlugs()).includes(slug)) {
    return new Response('Not found', {status: 404})
  }

  const body = await req.text()

  try {
    fs.writeFileSync(path.join(process.cwd(), 'posts', slug + '.md'), body)
    return new Response('Saved')
  } catch (e) {
    return new Response('Not found', {status: 404})
  }
}
