import { vValidator } from '@hono/valibot-validator'
import { Hono } from 'hono'
import { revalidatePath, revalidateTag } from 'next/cache'
import * as v from 'valibot'

import { env } from '@/env/server'

export const app = new Hono().post(
  '/',
  vValidator(
    'json',
    v.strictObject({
      tag: v.optional(v.string()),
      path: v.optional(v.string()),
    }),
  ),
  vValidator('header', v.object({ 'x-api-key': v.string() })),
  c => {
    if (c.req.valid('header')['x-api-key'] !== env.TRPFROG_ADMIN_KEY) {
      return c.text('Unauthorized', 401)
    }

    const { tag, path } = c.req.valid('json')
    if (!!tag === !!path) {
      return c.text('Either tag or path must be provided', 400)
    }

    if (tag) {
      revalidateTag(tag)
    } else if (path) {
      revalidatePath(path)
    }
    return c.text('OK')
  },
)
