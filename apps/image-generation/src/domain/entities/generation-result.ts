import { validateUnknown, validate, InferSchemaOutput } from '@trpfrog.net/utils'
import * as v from 'valibot'

export const ImageGenerationPromptSchema = v.object({
  author: v.string(),
  text: v.string(),
  translated: v.string(),
})

export const GeneratedImageSchema = v.object({
  modelName: v.string(),
  extension: v.string(),
  image: v.instance(ArrayBuffer),
})

export const ImageMetadataSchema = v.object({
  id: v.string(),
  prompt: ImageGenerationPromptSchema,
  modelName: v.string(),
  createdAt: v.date(),
  deletedAt: v.optional(v.date()),
  imageUri: v.pipe(v.string(), v.url()),
})

export type ImagePrompt = InferSchemaOutput<typeof ImageGenerationPromptSchema>
export type ImageMetadata = InferSchemaOutput<typeof ImageMetadataSchema>
export type GeneratedImage = InferSchemaOutput<typeof GeneratedImageSchema>

export function parseImageMetadata(record: ImageMetadata | string): ImageMetadata {
  if (typeof record === 'string') {
    return validateUnknown(ImageMetadataSchema, JSON.parse(record))
  } else {
    return validate(ImageMetadataSchema, record)
  }
}
