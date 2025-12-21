import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import * as v from 'valibot'

import { createTweetBlockFromUrl } from './lib'

export const route = new Hono().post(
  '/',
  sValidator('json', v.object({ url: v.string() })),
  async c => {
    try {
      const { url } = c.req.valid('json')
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
