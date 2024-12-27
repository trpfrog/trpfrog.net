import { getContext } from 'hono/context-storage'

import { imageUpdateStatusSchema } from '../../domain/entities/image-update-status'
import { ImageUpdateStatusRepo } from '../../domain/repos/image-update-status-repo'
import { Env } from '../../env'

const key = 'image-update-status'

export const imageUpdateStatusCloudflareKV: ImageUpdateStatusRepo = {
  get: async () => {
    const c = getContext<Env>()
    const rawStatus = await c.env.KV.get(key)

    let parsedStatus: JSONValue
    try {
      parsedStatus = JSON.parse(rawStatus ?? '')
    } catch (e) {
      console.error('Failed to parse image update status:', e)
      return { status: 'idle' }
    }

    const status = imageUpdateStatusSchema
      .catch({
        status: 'idle',
      })
      .parse(parsedStatus)

    return status
  },
  set: async status => {
    const c = getContext<Env>()
    await c.env.KV.put(key, JSON.stringify(status))
  },
}
