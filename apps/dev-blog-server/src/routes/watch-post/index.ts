import path from 'path'

import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'

import { createPostUpdateHub } from './post-updates'
import { startWatchPosts } from './watch-posts'

const hub = createPostUpdateHub()

startWatchPosts({
  postsDir: path.resolve(process.cwd(), '..', '..', 'posts'),
  onUpdate: slug => {
    console.log('changed', slug)
    hub.publish(slug)
  },
})

export const route = new Hono().get('/', c => {
  return streamSSE(c, async stream => {
    const unsubscribe = hub.subscribe(slug => {
      void stream.writeSSE({
        event: 'update',
        data: slug,
      })
    })

    stream.onAbort(() => {
      unsubscribe()
    })

    // Keep the connection alive by sending a comment every 30 seconds
    while (!stream.closed) {
      await stream.sleep(30_000)
      await stream.writeSSE({ data: '' })
    }
  })
})
