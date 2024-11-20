import type {
  TrpFrogImageGenerationMetadata,
  TrpFrogImageGenerationResult,
} from './generation-result'

export interface AITrpFrogImageRepo {
  read: {
    currentImage: () => Promise<ArrayBuffer>
    currentMetadata: () => Promise<TrpFrogImageGenerationMetadata>
  }
  update: (result: TrpFrogImageGenerationResult) => Promise<void>
}
