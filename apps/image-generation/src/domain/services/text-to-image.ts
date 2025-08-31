import { GeneratedImage } from '../entities/generation-result'

export type TextToImage = (text: string, inputImagesBase64?: string[]) => Promise<GeneratedImage>
