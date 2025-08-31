import { getContext } from 'hono/context-storage'

import { AssetsRepo } from '../../domain/repos/assets-repo'
import { Env } from '../../env'

export const assetsRepoWorkersAssets: AssetsRepo = {
  fetch: async (path: string) => {
    const c = getContext<Env>()
    const res = await c.env.ASSETS.fetch(path)
    if (!res.ok) {
      throw new Error(`Asset fetch failed: ${path} (${res.status})`)
    }
    return res
  },
}
