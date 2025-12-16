import path from 'path'

import chokidar, { FSWatcher } from 'chokidar'

export type WatchPostsOptions = {
  postsDir: string
  onUpdate: (slug: string) => void
}

function toSlug(markdownPath: string) {
  return path.basename(markdownPath).replace('.md', '')
}

export function startWatchPosts({ postsDir, onUpdate }: WatchPostsOptions): FSWatcher {
  const watcher = chokidar.watch(postsDir)

  watcher.on('change', markdownPath => {
    if (path.extname(markdownPath) !== '.md') return
    onUpdate(toSlug(markdownPath))
  })

  return watcher
}
