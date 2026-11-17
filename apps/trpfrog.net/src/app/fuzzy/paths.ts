import * as v from 'valibot'

import { validateUnknown } from '@trpfrog.net/utils'

import { docsPaths } from '@/app/docs/pages'
import { fetchSlugs } from '@blog/rpc'

/** 動的ルートを除いた、App Router のページのパス一覧 */
export function getStaticPagePaths(): string[] {
  // next.config.ts injects this literal during bundling. Read the property directly
  // so Next.js can substitute it, rather than reading the whole process.env object.
  // oxlint-disable-next-line node/no-process-env
  const rawPagePaths = process.env.FUZZY_PAGE_PATHS ?? '[]'
  return validateUnknown(v.array(v.string()), JSON.parse(rawPagePaths))
}

export function getDocsPagePaths(): string[] {
  return Object.keys(docsPaths).map(slug => `/docs/${encodeURIComponent(slug)}`)
}

export async function fetchCandidatePaths(): Promise<string[]> {
  const slugs = await fetchSlugs()
  return [
    ...new Set([
      ...getStaticPagePaths(),
      ...getDocsPagePaths(),
      ...slugs.map(slug => `/blog/${encodeURIComponent(slug)}`),
    ]),
  ]
}
