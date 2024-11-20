import type {
  TrpFrogImageGenerationMetadata,
  TrpFrogImageGenerationResult,
} from '../entities/generation-result'

export interface AITrpFrogImageRepo {
  read: {
    currentImage: () => Promise<ArrayBuffer>
    currentMetadata: () => Promise<TrpFrogImageGenerationMetadata>
  }
  update: (result: TrpFrogImageGenerationResult) => Promise<void>
}
