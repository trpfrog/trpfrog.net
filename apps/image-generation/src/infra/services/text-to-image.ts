import { HfInference } from '@huggingface/inference'

import { base64ArrayBuffer } from '../../lib/base64'

export function createHfImageGenerator(params: { modelName: string; hfToken: string }) {
  return async (text: string) => {
    const hf = new HfInference(params.hfToken)
    const responseBlob = await hf.textToImage(
      {
        model: params.modelName,
        inputs: text,
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
    if (invalidImagePattern.test(base64)) {
      return Promise.reject('Failed to generate image')
    }

    return arrayBuffer
  }
}
