import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import * as v from 'valibot'

import { generateAltText } from './generator'

export const route = new Hono().post(
  '/',
  sValidator('form', v.object({ image: v.file() })),
  async c => {
    const { image } = c.req.valid('form')
    try {
      const altText = await generateAltText(await image.arrayBuffer())
      return c.json({ altText })
    } catch (error) {
      console.error(error)
      return c.json({ error: 'Internal Server Error' }, 500)
    }
  },
)
