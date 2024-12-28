import { zValidator } from '@hono/zod-validator'
import { stringifiedBooleanSchema } from '@trpfrog.net/utils/zod'
import { Hono } from 'hono'
import { z } from 'zod'

import { imageMetadataRepoQuerySchema } from '../domain/repos/image-metadata-repo'
import { Env } from '../env'

import { requiresApiKey } from './middlewares'

export const queryApp = new Hono<Env>().get(
  '/',
  requiresApiKey(),
  zValidator(
    'query',
    z
      .object({
        q: z.string().optional(),
        limit: z.coerce.number().int().positive().max(100).optional(),
        offset: z.coerce.number().optional(),
        includeDeleted: stringifiedBooleanSchema.optional(),
      })
      .strict(),
  ),
  async c => {
    const rawQuery = c.req.valid('query')

    const res = imageMetadataRepoQuerySchema.safeParse({
      where: {
        prompt: rawQuery.q,
        includeDeleted: rawQuery.includeDeleted,
      },
      limit: rawQuery.limit,
      offset: rawQuery.offset,
    } satisfies z.input<typeof imageMetadataRepoQuerySchema>)

    if (!res.success) {
      return c.json({ error: res.error }, 400)
    }
    const data = await c.var.UCS.queryImageMetadata(res.data)
    return c.json({
      result: data.result,
      total: data.count,
    })
  },
)
