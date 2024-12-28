import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { revalidatePath, revalidateTag } from 'next/cache'
import { z } from 'zod'

import { env } from '@/env/server'

export const app = new Hono().post(
  '/',
  zValidator(
    'json',
    z
      .object({
        tag: z.string().optional(),
        path: z.string().optional(),
      })
      .strict(),
  ),
  zValidator('header', z.object({ 'x-api-key': z.string() })),
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
