// Internal Next.js API: paths.test.ts exercises the real implementation so
// upgrades that change the import or normalization behavior fail our tests.
import { normalizeAppPath } from 'next/dist/shared/lib/router/utils/app-paths'

/** Convert App Router page files into concrete public paths at configuration time. */
export function collectPagePaths(pageFiles: string[]): string[] {
  const paths = pageFiles.flatMap(file => {
    const appPath = file.replaceAll('\\', '/').replace(/\.[^/.]+$/, '')
    const segments = appPath.split('/').slice(0, -1)
    // Dynamic routes need a provider for their concrete URLs. Private folders,
    // parallel slots and intercepting routes do not define standalone pages.
    if (segments.some(s => s.includes('[') || /^[_@]/.test(s) || s.startsWith('(.'))) {
      return []
    }
    return [normalizeAppPath(appPath).replaceAll('%5F', '_')]
  })
  return [...new Set(paths)].sort()
}
