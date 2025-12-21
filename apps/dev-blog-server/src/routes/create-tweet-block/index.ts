import { sValidator } from '@hono/standard-validator'
import clipboardy from 'clipboardy'
import { Hono } from 'hono'
import * as v from 'valibot'

import { createTweetBlockFromUrl } from './lib'

export const route = new Hono().post(
  '/',
  sValidator(
    'json',
    v.variant('source', [
      v.object({
        source: v.literal('url'),
        url: v.string(),
      }),
      v.object({
        source: v.literal('server-side-clipboard'),
      }),
    ]),
    (result, c) => {
      if (!result.success) {
        const message = result.error.map(e => e.message).join(', ') || 'Invalid payload'
        return c.json({ error: message }, 400)
      }
    },
  ),
  async c => {
    try {
      const payload = c.req.valid('json')
      const url = payload.source === 'server-side-clipboard' ? clipboardy.readSync() : payload.url
      const codeBlock = await createTweetBlockFromUrl(url)

      return c.json({ codeBlock }, 200)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal Server Error'
      const status = message === 'Invalid URL' ? 400 : 500
      console.error(error)
      return c.json({ error: message }, status)
    }
  },
)
