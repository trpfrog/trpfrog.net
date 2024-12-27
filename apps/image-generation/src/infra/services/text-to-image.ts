import { HfInference } from '@huggingface/inference'
import { getContext } from 'hono/context-storage'

import { GeneratedImage } from '../../domain/entities/generation-result'
import { Env } from '../../env'
import { base64ArrayBuffer } from '../../lib/base64'

export function createHfImageGenerator(params: { modelName: string; hfToken?: string }) {
  return async (text: string): Promise<GeneratedImage> => {
    const c = getContext<Env>()
    const hf = new HfInference(params.hfToken ?? c.env.HUGGINGFACE_TOKEN)

    const responseBlob = await hf
      .textToImage(
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
      .catch(e => {
        console.error('Internal Error in HuggingFace:', e, '\nRequest:', text)
        return Promise.reject('Failed to generate image')
      })

    const arrayBuffer = await responseBlob.arrayBuffer().catch(e => {
      console.error('Failed to convert Blob to ArrayBuffer:', e)
      return Promise.reject('Failed to generate image')
    })
    const base64 = base64ArrayBuffer(arrayBuffer)

    // if sensitive image is generated, huggingface returns a black image.
    // Base64 of this image contains "ooooAKKKKACiiigA" pattern.
    const invalidImagePattern = /(ooooAKKKKACiiigA){100,}/
    if (invalidImagePattern.test(base64)) {
      return Promise.reject('Failed to generate image due to sensitive content')
    }

    return {
      image: arrayBuffer,
      modelName: params.modelName,
      extension: '.' + responseBlob.type.split('/')[1],
    }
  }
}
