import { z } from 'zod'

export const TrpFrogImagePromptSchema = z.object({
  prompt: z.string(),
  translated: z.string(),
})

export const TrpFrogImageGenerationMetadataSchema = TrpFrogImagePromptSchema.extend({
  generatedTime: z.number().int().min(0),
})

export const TrpFrogImageGenerationResultSchema = TrpFrogImageGenerationMetadataSchema.extend({
  arrayBuffer: z.instanceof(ArrayBuffer),
})

export type TrpFrogImagePrompt = z.infer<typeof TrpFrogImagePromptSchema>
export type TrpFrogImageGenerationMetadata = z.infer<typeof TrpFrogImageGenerationMetadataSchema>
export type TrpFrogImageGenerationResult = z.infer<typeof TrpFrogImageGenerationResultSchema>
