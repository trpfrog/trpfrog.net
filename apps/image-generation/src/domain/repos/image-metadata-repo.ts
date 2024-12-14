import { z } from 'zod'

import { GeneratedImageMetadata } from '../entities/generation-result'

export const generatedImageMetadataRepoQuerySchema = z.object({
  prompt: z.string().optional(),
  limit: z.number().int().positive().default(50),
  offset: z.number().int().positive().default(0),
})

type Query = z.infer<typeof generatedImageMetadataRepoQuerySchema>

export interface GeneratedImageMetadataRepo {
  query: (query: Query) => Promise<GeneratedImageMetadata[]>
  getLatest: () => Promise<GeneratedImageMetadata | undefined>
  amount: () => Promise<number>
  add: (image: GeneratedImageMetadata) => Promise<void>
  remove: (id: string) => Promise<void>
}
