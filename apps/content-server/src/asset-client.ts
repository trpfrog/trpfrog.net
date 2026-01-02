import { devBlogServerClient } from '@trpfrog.net/dev-blog-server'
import { BlogPost } from '@trpfrog.net/posts'
import { Context } from 'hono'
import { hc } from 'hono/client'
import { match } from 'ts-pattern'

import { env, Env } from './env'
import ssgTargetApp from './ssg' // This will be the target for SSG and can be accessed via ASSETS binding

interface AssetClient {
  fetchSlugs: () => Promise<string[]>
  fetchTags: () => Promise<string[]>
  fetchPosts: () => Promise<BlogPost[]>
  fetchContent: (slug: string) => Promise<string>
}

// Create an AssetClient from a client with the same shape as devBlogServerClient.ssg_assets
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
      const url = new URL(rawInput instanceof Request ? rawInput.url : rawInput)
      url.pathname += '.json'
      const req = new Request(url.toString(), rawInput instanceof Request ? rawInput : undefined)
      return c.env.ASSETS.fetch(req, ...rest)
    },
  })
  return createAssetClientFromRPC(ssgTargetAppClient.assets)
}

console.log(env.TRPFROG_NET_CONTENT_SERVER_SOURCE_STRATEGY)

export const createAssetsClient = (c: Context<Env>) =>
  match(env.TRPFROG_NET_CONTENT_SERVER_SOURCE_STRATEGY)
    .with('dev-realtime', () => devAssetClient)
    .with('static-generated', () => createProductionAssetClient(c))
    .exhaustive()
