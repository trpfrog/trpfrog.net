import * as v from 'valibot'

import { validateUnknown, validate, InferSchemaOutput } from '@trpfrog.net/utils'

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

/**
 * 画像モデルに渡す詳細な指示。表示用の短いキャプション (`ImagePrompt.text`) とは別に持つ。
 * 永続化はしない。
 */
export const ImageBriefSchema = v.object({
  /** 舞台・状況・小道具などの具体的な描写 */
  scene: v.string(),
  /** 画風・画材・ライティング・配色 */
  style: v.string(),
  /** 構図・画角 */
  composition: v.string(),
})

export type ImageBrief = InferSchemaOutput<typeof ImageBriefSchema>
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
