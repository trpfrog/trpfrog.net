import { GeneratedImage } from '../entities/generation-result'

export type TextToImage = (text: string, inputImagesBase64?: string[]) => Promise<GeneratedImage>

export class InvalidTextToImageInputError extends Error {}

export class UnexpectedTextToImageModelResponseError extends Error {}
