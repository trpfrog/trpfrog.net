import * as v from 'valibot'

import { validateUnknown } from '@trpfrog.net/utils'

import { docsPaths } from '@/app/docs/pages'
import { fetchSlugs } from '@blog/rpc'

export async function fetchCandidatePaths(): Promise<string[]> {
  // oxlint-disable-next-line node/no-process-env -- next.config.ts inlines this property at build time, so read it directly
  const rawPagePaths = process.env.FUZZY_PAGE_PATHS ?? '[]'
  const pagePaths = validateUnknown(v.array(v.string()), JSON.parse(rawPagePaths))
  const slugs = await fetchSlugs()
  return [
    ...new Set([
      ...pagePaths,
      ...Object.keys(docsPaths).map(slug => `/docs/${encodeURIComponent(slug)}`),
      ...slugs.map(slug => `/blog/${encodeURIComponent(slug)}`),
    ]),
  ]
}
