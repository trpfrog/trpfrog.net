import fs from 'fs'
import path from 'path'

export async function GET(req: Request) {
  const slug = req.headers.get('x-blog-slug')
  if (!slug) {
    return new Response('Missing x-blog-slug header', {status: 400})
  }
  const md = fs.readFileSync(path.join(process.cwd(), 'posts', slug + '.md'), 'utf-8')

  try {
    return new Response(md)
  } catch (e) {
    return new Response('Not found', {status: 404})
  }
}

export async function POST(req: Request) {
  const slug = req.headers.get('x-blog-slug')
  const body = await req.text()

  try {
    fs.writeFileSync(path.join(process.cwd(), 'posts', slug + '.md'), body)
    return new Response('Saved')
  } catch (e) {
    return new Response('Not found', {status: 404})
  }
}
