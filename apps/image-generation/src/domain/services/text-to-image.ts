import { GeneratedImage } from '../entities/generation-result'

export type TextToImage = (text: string) => Promise<GeneratedImage>
