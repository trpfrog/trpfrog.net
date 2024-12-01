import { getContext } from 'hono/context-storage'

import { TrpFrogImageGenerationMetadataSchema } from '../../domain/entities/generation-result'
import { AITrpFrogImageRepo } from '../../domain/repos/image-repo'
import { Env } from '../../env'

const CURRENT_IMAGE_KEY = 'current-image'
const CURRENT_METADATA_KEY = 'current-metadata'

export const workersTrpFrogImageRepo: AITrpFrogImageRepo = {
  read: {
    currentImage: async () => {
      const c = getContext<Env>()
      const maybeArrayBuffer = await c.env.DIFFUSION_KV.get(CURRENT_IMAGE_KEY, {
        type: 'arrayBuffer',
      })
      if (!maybeArrayBuffer) {
        return Promise.reject(new Error('No image found'))
      }
      return maybeArrayBuffer
    },

    currentMetadata: async () => {
      const c = getContext<Env>()
      const metadata = await c.env.DIFFUSION_KV.get(CURRENT_METADATA_KEY, { type: 'json' })
      return TrpFrogImageGenerationMetadataSchema.parse(metadata)
    },
  },

  update: async result => {
    const c = getContext<Env>()
    const { arrayBuffer, ...metadata } = result
    await Promise.all([
      c.env.DIFFUSION_KV.put(CURRENT_IMAGE_KEY, arrayBuffer),
      c.env.DIFFUSION_KV.put(CURRENT_METADATA_KEY, JSON.stringify(metadata)),
    ])
  },
}
