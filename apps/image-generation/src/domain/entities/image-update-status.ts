import { z } from 'zod'

export const imageUpdateStatusSchema = z.union([
  z.object({
    status: z.literal('idle'),
  }),
  z.object({
    status: z.literal('updating'),
    startedAt: z.date(),
  }),
  z.object({
    status: z.literal('error'),
    occurredAt: z.date(),
  }),
])

export type ImageUpdateStatus = z.infer<typeof imageUpdateStatusSchema>
