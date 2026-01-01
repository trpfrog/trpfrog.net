import { devBlogServerClient } from '@trpfrog.net/dev-blog-server'
import { ssgAssetsRoute } from '@trpfrog.net/dev-blog-server/ssg-assets'
import { BlogPost } from '@trpfrog.net/posts'
import { Context, Hono } from 'hono'
import { hc } from 'hono/client'

import { Env } from './env'

// This will be the target for SSG and can be accessed via ASSETS binding
const ssgTargetApp = new Hono().route('/assets', ssgAssetsRoute)

interface AssetClient {
  fetchSlugs: () => Promise<string[]>
  fetchTags: () => Promise<string[]>
  fetchPosts: () => Promise<BlogPost[]>
  fetchContent: (slug: string) => Promise<string>
}

function createAssetClientFromRPC(rpc: (typeof devBlogServerClient)['ssg_assets']): AssetClient {
  return {
    fetchSlugs: async () => {
      return rpc.slugs.$get().then(res => res.json())
    },
    fetchTags: async () => {
      return rpc.tags.$get().then(res => res.json())
    },
    fetchPosts: async () => {
      return rpc.posts.$get().then(res => res.json())
    },
    fetchContent: async (slug: string) => {
      const res = await rpc.posts[':slug'].$get({ param: { slug } })
      const data = await res.json()
      if ('error' in data) {
        throw new Error('Content not found')
      }
      return data.content
    },
  }
}

// If in development environment, get article data directly from dev-blog-server via RPC
const devAssetClient: AssetClient = createAssetClientFromRPC(devBlogServerClient.ssg_assets)

// If in production environment, get article data via ASSETS binding
const createProductionAssetClient = (c: Context<Env>): AssetClient => {
  const origin = new URL(c.req.url).origin
  const ssgTargetAppClient = hc<typeof ssgTargetApp>(origin, {
    // Append `.json` to the end of the URL to fetch via ASSETS binding
    fetch: (...params: Parameters<typeof fetch>) => {
      const [rawInput, ...rest] = params
      const url =
        rawInput instanceof Request
          ? rawInput.url
          : rawInput instanceof URL
            ? rawInput.toString()
            : rawInput
      return c.env.ASSETS.fetch(url + '.json', ...rest)
    },
  })
  return createAssetClientFromRPC(ssgTargetAppClient.assets)
}

export const createAssetsClient = (c: Context<Env>) =>
  process.env.NODE_ENV === 'development' ? devAssetClient : createProductionAssetClient(c)

// eslint-disable-next-line no-restricted-exports
export default ssgTargetApp
