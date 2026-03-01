import * as v from 'valibot'

import { InferSchemaOutput } from '@trpfrog.net/utils'

export const ImageUpdateStatusSchema = v.variant('status', [
  v.object({
    status: v.literal('idle'),
  }),
  v.object({
    status: v.literal('updating'),
    startedAt: v.date(),
  }),
  v.object({
    status: v.literal('error'),
    occurredAt: v.date(),
  }),
])

export type ImageUpdateStatus = InferSchemaOutput<typeof ImageUpdateStatusSchema>
