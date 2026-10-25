import * as v from 'valibot'

import { validateUnknown } from '@trpfrog.net/utils'

import { docsPaths } from '@/app/docs/pages'
import { fetchSlugs } from '@blog/rpc'

export async function fetchCandidatePaths(): Promise<string[]> {
  // next.config.ts injects this literal during bundling. Read the property directly
  // so Next.js can substitute it, rather than reading the whole process.env object.
  // oxlint-disable-next-line node/no-process-env
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
