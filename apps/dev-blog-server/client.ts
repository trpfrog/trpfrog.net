/// <reference lib="dom" />

import { services } from '@trpfrog.net/constants'

type DevBlogWatchClient = {
  onUpdate: (handler: (slug: string) => void) => void
  disconnect: () => void
}

export const createPostWatcherClient: () => DevBlogWatchClient | null =
  process.env.NODE_ENV !== 'development'
    ? () => null
    : () => {
        const endpoint = services.mdServer.development
        if (!endpoint) throw new Error('No endpoint found')

        const eventSource = new EventSource(new URL('/watch-post', endpoint))
        let listener: ((event: MessageEvent) => void) | null = null

        return {
          onUpdate(handler) {
            console.log('Connecting to dev-blog-server for post updates...')
            if (listener) {
              eventSource.removeEventListener('update', listener)
            }
            listener = event => handler(String(event.data))
            eventSource.addEventListener('update', listener)
          },
          disconnect() {
            if (listener) {
              eventSource.removeEventListener('update', listener)
            }
            eventSource.close()
          },
        }
      }
