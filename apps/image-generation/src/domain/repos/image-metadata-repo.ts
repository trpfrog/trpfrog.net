import * as v from 'valibot'

import { ImageMetadata } from '../entities/generation-result'

export const ImageMetadataRepoQuerySchema = v.object({
  where: v.optional(
    v.object({
      prompt: v.optional(v.string()),
      includeDeleted: v.optional(v.boolean()),
    }),
    {},
  ),
  limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1)), 20),
  offset: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0)), 0),
})

export type ImageMetadataQuery = v.InferOutput<typeof ImageMetadataRepoQuerySchema>

export interface ImageMetadataRepo {
  query: (query: ImageMetadataQuery) => Promise<ImageMetadata[]>
  getLatest: () => Promise<ImageMetadata | undefined>
  count: (query?: ImageMetadataQuery['where']) => Promise<number>
  add: (image: ImageMetadata) => Promise<void>
  hardDelete: (id: string) => Promise<void>
  softDelete: (id: string) => Promise<void>
  undelete: (id: string) => Promise<void>
}
