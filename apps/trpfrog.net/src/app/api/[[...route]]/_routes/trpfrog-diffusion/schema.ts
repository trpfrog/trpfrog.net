import { z } from 'zod'

export const TrpFrogImageGenerationResultSchema = z.object({
  generatedTime: z.number(),
  prompt: z.string(),
  translated: z.string(),
  base64: z.string(),
})

export type TrpFrogImageGenerationResult = z.infer<typeof TrpFrogImageGenerationResultSchema>
