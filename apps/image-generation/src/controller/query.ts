import { vValidator } from '@hono/valibot-validator'
import { StringifiedBooleanSchema, vCoerceNumber } from '@trpfrog.net/utils/valibot'
import { Hono } from 'hono'
import * as v from 'valibot'

import { ImageMetadataRepoQuerySchema } from '../domain/repos/image-metadata-repo'
import { Env } from '../env'

import { requiresApiKey } from './middlewares'

export const queryApp = new Hono<Env>().get(
  '/',
  requiresApiKey(),
  vValidator(
    'query',
    v.strictObject({
      q: v.optional(v.string()),
      limit: v.optional(v.pipe(vCoerceNumber, v.integer(), v.minValue(1), v.maxValue(100)), 20),
      offset: v.optional(v.pipe(vCoerceNumber, v.integer(), v.minValue(0)), 0),
      includeDeleted: v.optional(StringifiedBooleanSchema),
    }),
  ),
  async c => {
    const rawQuery = c.req.valid('query')

    const res = v.safeParse(ImageMetadataRepoQuerySchema, {
      where: {
        prompt: rawQuery.q,
        includeDeleted: rawQuery.includeDeleted,
      },
      limit: rawQuery.limit,
      offset: rawQuery.offset,
    } satisfies v.InferInput<typeof ImageMetadataRepoQuerySchema>)

    if (!res.success) {
      return c.json({ error: res.issues }, 400)
    }
    const data = await c.var.UCS.queryImageMetadata(res.output)
    return c.json({
      result: data.result,
      total: data.count,
    })
  },
)
