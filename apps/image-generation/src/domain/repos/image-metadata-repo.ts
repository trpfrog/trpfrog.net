import { z } from 'zod'

import { ImageMetadata } from '../entities/generation-result'

export const imageMetadataRepoQuerySchema = z.object({
  where: z
    .object({
      prompt: z.string().optional(),
    })
    .default({}),
  limit: z.number().int().positive().default(20),
  offset: z.number().int().positive().default(0),
})

export type ImageMetadataQuery = z.output<typeof imageMetadataRepoQuerySchema>

export function creaeteImageMetadataQuery(
  query: z.input<typeof imageMetadataRepoQuerySchema>,
): ImageMetadataQuery {
  return imageMetadataRepoQuerySchema.parse(query)
}

export interface ImageMetadataRepo {
  query: (query: ImageMetadataQuery) => Promise<ImageMetadata[]>
  getLatest: () => Promise<ImageMetadata | undefined>
  count: (query?: ImageMetadataQuery['where']) => Promise<number>
  add: (image: ImageMetadata) => Promise<void>
  remove: (id: string) => Promise<void>
}
