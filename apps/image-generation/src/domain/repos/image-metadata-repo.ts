import { z } from 'zod'

import { ImageMetadata } from '../entities/generation-result'

export const imageMetadataRepoQuerySchema = z.object({
  where: z
    .object({
      prompt: z.string().optional(),
      includeDeleted: z.boolean().optional(),
    })
    .default({}),
  limit: z.number().int().positive().default(20),
  offset: z.number().int().nonnegative().default(0),
})

export type ImageMetadataQuery = z.output<typeof imageMetadataRepoQuerySchema>

export interface ImageMetadataRepo {
  query: (query: ImageMetadataQuery) => Promise<ImageMetadata[]>
  getLatest: () => Promise<ImageMetadata | undefined>
  count: (query?: ImageMetadataQuery['where']) => Promise<number>
  add: (image: ImageMetadata) => Promise<void>
  hardDelete: (id: string) => Promise<void>
  softDelete: (id: string) => Promise<void>
  undelete: (id: string) => Promise<void>
}
