import { z } from 'zod'

export const TrpFrogImageGenerationMetadataSchema = z.object({
  generatedTime: z.number().int().min(0),
  prompt: z.string(),
  translated: z.string(),
})

export const TrpFrogImageGenerationResultSchema = TrpFrogImageGenerationMetadataSchema.extend({
  arrayBuffer: z.instanceof(ArrayBuffer),
})

export type TrpFrogImageGenerationMetadata = z.infer<typeof TrpFrogImageGenerationMetadataSchema>
export type TrpFrogImageGenerationResult = z.infer<typeof TrpFrogImageGenerationResultSchema>
