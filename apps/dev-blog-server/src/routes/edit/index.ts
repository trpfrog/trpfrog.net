import { promises as fs } from 'fs'

import { sValidator } from '@hono/standard-validator'
import { resolvePostPath } from '@trpfrog.net/posts'
import { Hono } from 'hono'
import * as v from 'valibot'

async function appendLine(filePath: string, line: string) {
  const content = await fs.readFile(filePath, 'utf8')
  const needsNewline = content.length > 0 && !content.endsWith('\n')
  const normalizedLine = line.endsWith('\n') ? line.slice(0, -1) : line
  const prefix = needsNewline ? '\n' : ''
  await fs.appendFile(filePath, `${prefix}${normalizedLine}\n`, 'utf8')
}

export const route = new Hono().post(
  '/append_line',
  sValidator('json', v.object({ slug: v.string(), line: v.string() })),
  async c => {
    const { slug, line } = c.req.valid('json')

    let postPath: string
    try {
      postPath = resolvePostPath(slug)
    } catch {
      return c.json({ error: 'Invalid slug' }, 400)
    }
    const exists = await fs
      .access(postPath)
      .then(() => true)
      .catch(() => false)

    if (!exists) {
      return c.json({ error: 'Post not found' }, 404)
    }

    try {
      await appendLine(postPath, line)
      return c.json({ ok: true }, 200)
    } catch (error) {
      console.error(error)
      return c.json({ error: 'Internal Server Error' }, 500)
    }
  },
)
