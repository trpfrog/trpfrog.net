import * as path from 'path'

// TODO: make posts directory configurable
const postsDirectory = path.join(process.cwd(), '..', '..', 'posts')

export function getPostsDirectory() {
  return postsDirectory
}

export function resolvePostPath(slug: string): string {
  // Resolve to an absolute path and ensure it stays under postsDirectory to block path traversal.
  const resolved = path.resolve(postsDirectory, `${slug}.md`)
  const relative = path.relative(postsDirectory, resolved)
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('Invalid post slug')
  }
  return resolved
}

export function getPostSlugFromPath(markdownPath: string): string | null {
  const ext = path.extname(markdownPath)
  if (ext !== '.md') {
    return null
  }
  return path.basename(markdownPath, ext)
}
