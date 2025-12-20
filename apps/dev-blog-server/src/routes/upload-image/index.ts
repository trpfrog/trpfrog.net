import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import * as v from 'valibot'

import { uploadToCloudinary } from './upload-to-cloudinary'

export const route = new Hono().post(
  '/',
  sValidator('form', v.object({ image: v.file(), slug: v.string() })),
  async c => {
    const { slug, image } = c.req.valid('form')
    try {
      const { public_id, format, width, height } = await uploadToCloudinary(image, slug)
      return c.json({ path: `/${public_id}.${format}?w=${width}&h=${height}` }, 200)
    } catch (error) {
      console.error(error)
      return c.json({ error: 'Internal Server Error' }, 500)
    }
  },
)
