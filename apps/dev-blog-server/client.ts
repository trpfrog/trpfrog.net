/// <reference lib="dom" />

import { hc } from 'hono/client'

import { services } from '@trpfrog.net/constants'

import { type app } from './src/dev-server'

type SlugUpdateEventHandler = (slug: string) => void

type DevBlogWatchClient = {
  onUpdate: (handler: SlugUpdateEventHandler) => void
  disconnect: () => void
}

export const createPostWatcherClient: () => DevBlogWatchClient | null =
  process.env.NODE_ENV !== 'development'
    ? () => null
    : () => {
        const endpoint = services.mdServer.development
        // portless を通さずに起動したときは dev-blog-server に届かないので、ライブ更新をしない
        if (!endpoint) return null

        const eventSource = new EventSource(new URL('/watch-post', endpoint))

        const updateHandler = new Set<SlugUpdateEventHandler>()
        const updateListener = (event: MessageEvent) => {
          updateHandler.forEach(handler => handler(String(event.data)))
        }

        eventSource.addEventListener('update', updateListener)

        return {
          onUpdate(handler) {
            console.log('Connecting to dev-blog-server for post updates...')
            updateHandler.add(handler)
          },
          disconnect() {
            updateHandler.clear()
            eventSource.removeEventListener('update', updateListener)
            eventSource.close()
          },
        }
      }

// portless を通さずに起動したときは origin が決まらない。必ず失敗する .invalid に向けておく
export const devBlogServerClient = hc<typeof app>(
  services.mdServer.development ?? 'http://dev-blog-server.invalid',
)
