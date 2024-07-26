import { z } from 'zod'

export const TrpFrogImageGenerationResultSchema = z.object({
  generatedTime: z.number().int().min(0),
  prompt: z.string(),
  translated: z.string(),
  base64: z.string(),
  arrayBuffer: z.instanceof(ArrayBuffer),
})

export type TrpFrogImageGenerationResult = z.infer<typeof TrpFrogImageGenerationResultSchema>
