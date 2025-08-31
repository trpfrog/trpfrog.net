import { services } from '@trpfrog.net/constants'
import { getContext } from 'hono/context-storage'

import { AssetsRepo } from '../../domain/repos/assets-repo'
import { Env } from '../../env'

export const assetsRepoWorkersAssets: AssetsRepo = {
  fetch: async (path: string) => {
    const c = getContext<Env>()

    // assetUrl = origin of c.req.url + path
    const assetUrl = new URL(c.req.url)
    assetUrl.pathname = path
    if (assetUrl.origin === services.imageGeneration.origin('production')) {
      assetUrl.pathname = services.imageGeneration.basePath + path
    }

    const res = await c.env.ASSETS.fetch(assetUrl)
    if (!res.ok) {
      throw new Error(`Asset fetch failed: ${path} (${res.status})`)
    }
    return res
  },
}
