import { z } from 'zod'

export const imageGenerationPromptSchema = z.object({
  author: z.string(),
  text: z.string(),
  translated: z.string(),
})

export const generatedImageSchema = z.object({
  id: z.string(),
  prompt: imageGenerationPromptSchema,
  modelName: z.string(),
  createdAt: z.date(),
  imageUri: z.string().url(),
})

export type ImagePrompt = z.infer<typeof imageGenerationPromptSchema>
export type GeneratedImageMetadata = z.infer<typeof generatedImageSchema>

export function parseGeneratedImage(
  record: GeneratedImageMetadata | string,
): GeneratedImageMetadata {
  if (typeof record === 'string') {
    return generatedImageSchema.parse(JSON.parse(record))
  } else {
    return generatedImageSchema.parse(record)
  }
}
