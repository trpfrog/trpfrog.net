import { GeneratedImageMetadata } from '../entities/generation-result'

export interface GeneratedImageMetadataRepo {
  getAll: () => Promise<GeneratedImageMetadata[]>
  getLatest: () => Promise<GeneratedImageMetadata | undefined>
  add: (image: GeneratedImageMetadata) => Promise<void>
  remove: (id: string) => Promise<void>
}
