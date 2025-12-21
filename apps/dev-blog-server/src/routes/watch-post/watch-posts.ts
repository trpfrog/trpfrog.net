import { getPostSlugFromPath } from '@trpfrog.net/posts'
import chokidar, { FSWatcher } from 'chokidar'

export type WatchPostsOptions = {
  postsDir: string
  onUpdate: (slug: string) => void
}

export function startWatchPosts({ postsDir, onUpdate }: WatchPostsOptions): FSWatcher {
  const watcher = chokidar.watch(postsDir)

  watcher.on('change', markdownPath => {
    const slug = getPostSlugFromPath(markdownPath)
    if (!slug) return
    onUpdate(slug)
  })

  return watcher
}
