import { z } from 'zod'

import { ImageMetadata } from '../entities/generation-result'

export const imageMetadataRepoQuerySchema = z.object({
  prompt: z.string().optional(),
  limit: z.number().int().positive().default(50),
  offset: z.number().int().positive().default(0),
})

type Query = z.infer<typeof imageMetadataRepoQuerySchema>

export interface ImageMetadataRepo {
  query: (query: Query) => Promise<ImageMetadata[]>
  getLatest: () => Promise<ImageMetadata | undefined>
  amount: () => Promise<number>
  add: (image: ImageMetadata) => Promise<void>
  remove: (id: string) => Promise<void>
}
