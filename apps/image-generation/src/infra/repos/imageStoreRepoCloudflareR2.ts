import { getContext } from 'hono/context-storage'

import { ImageStoreRepo } from '../../domain/repos/image-store-repo'
import { Env } from '../../env'

function toR2Key(filename: string) {
  return `ai-icons/${filename}`
}

export const imageStoreRepoCloudflareR2: ImageStoreRepo = {
  upload: async (filename: string, imageData: ArrayBuffer) => {
    const c = getContext<Env>()
    const filePath = toR2Key(filename)
    await c.env.BUCKET.put(filePath, imageData)
    return `https://media.trpfrog.net/${filePath}`
  },

  download: async (filename: string) => {
    const c = getContext<Env>()
    const filePath = toR2Key(filename)
    const res = await c.env.BUCKET.get(filePath)
    if (res === null) {
      throw new Error('Not found')
    }
    return await res.arrayBuffer()
  },

  delete: async (filename: string) => {
    const c = getContext<Env>()
    const filePath = toR2Key(filename)
    await c.env.BUCKET.delete(filePath)
  },
}
