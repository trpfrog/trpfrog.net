import { HfInference } from '@huggingface/inference'

import { base64ArrayBuffer } from '../lib/base64'

export interface GeneratedImage {
  arrayBuffer: ArrayBuffer
  base64: string
  success: boolean
}

export async function generateTrpFrogImage(
  prompt: string,
  hfToken: string,
): Promise<GeneratedImage> {
  const hf = new HfInference(hfToken)
  const responseBlob = await hf.textToImage(
    {
      model: 'Prgckwb/trpfrog-diffusion',
      inputs: prompt,
    },
    {
      use_cache: true,
      wait_for_model: true,
      retry_on_error: true,
    },
  )

  const arrayBuffer = await responseBlob.arrayBuffer()
  const base64 = base64ArrayBuffer(arrayBuffer)

  // if sensitive image is generated, huggingface returns a black image.
  // Base64 of this image contains "ooooAKKKKACiiigA" pattern.
  const invalidImagePattern = /(ooooAKKKKACiiigA){100,}/

  return {
    arrayBuffer,
    base64,
    success: !invalidImagePattern.test(base64),
  }
}
