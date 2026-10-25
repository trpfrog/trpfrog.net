import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { fetchSlugs } from '@blog/rpc'

import { collectPagePaths } from '../../../tools/fuzzyPagePaths'
import { fetchCandidatePaths } from './paths'

vi.mock('@blog/rpc', () => ({ fetchSlugs: vi.fn<typeof fetchSlugs>() }))

afterEach(() => vi.unstubAllEnvs())

describe('collectPagePaths', () => {
  // Do not mock normalizeAppPath: these cases guard our dependency on Next.js's
  // internal API, including preservation of non-leaf "page" and "route" segments.
  it.each([
    ['page.tsx', '/'],
    ['(home)/page.tsx', '/'],
    ['(site)/(gallery)/icons/page.tsx', '/icons'],
    ['nested/new-page/page.tsx', '/nested/new-page'],
    ['nested/(group)/new-page/page.mdx', '/nested/new-page'],
    ['page/route/page.tsx', '/page/route'],
    ['%5Fpublic/page.tsx', '/_public'],
    ['(gallery)\\icons\\page.tsx', '/icons'],
  ])('normalizes %s to %s using the real Next.js implementation', (file, expected) => {
    expect(collectPagePaths([file])).toEqual([expected])
  })

  it.each([
    'blog/[slug]/page.tsx',
    'blog/[slug]/[[...options]]/page.tsx',
    'blog/preview/[...slug]/page.tsx',
    '_private/page.tsx',
    '(site)/_private/nested/page.tsx',
    '@modal/page.tsx',
    'nested/@modal/page.tsx',
    '(.)intercepted/page.tsx',
    'nested/(..)intercepted/page.tsx',
    'nested/(...)intercepted/page.tsx',
  ])('excludes non-concrete or non-standalone page %s', file => {
    expect(collectPagePaths([file])).toEqual([])
  })

  it('deduplicates normalized URLs and returns them in stable order', () => {
    expect(
      collectPagePaths([
        'works/page.tsx',
        '(home)/page.tsx',
        '(gallery)/icons/page.tsx',
        '(duplicate)/icons/page.tsx',
      ]),
    ).toEqual(['/', '/icons', '/works'])
  })
})

describe('fetchCandidatePaths', () => {
  it('includes discovered pages, documents and newly published articles', async () => {
    vi.stubEnv('FUZZY_PAGE_PATHS', '["/","/blog","/new-page"]')
    vi.mocked(fetchSlugs)
      .mockResolvedValueOnce(['old-post'])
      .mockResolvedValueOnce(['old-post', 'new-post'])
    expect(await fetchCandidatePaths()).toEqual(
      expect.arrayContaining(['/', '/new-page', '/docs/markdown', '/blog/old-post']),
    )
    expect(await fetchCandidatePaths()).toContain('/blog/new-post')
  })

  it('encodes dynamic segments so article slugs stay within the blog route', async () => {
    vi.stubEnv('FUZZY_PAGE_PATHS', '["/blog"]')
    vi.mocked(fetchSlugs).mockResolvedValue(['a/b?c#d', 'a/b?c#d'])
    expect(await fetchCandidatePaths()).toEqual(expect.arrayContaining(['/blog/a%2Fb%3Fc%23d']))
    expect((await fetchCandidatePaths()).filter(path => path.startsWith('/blog/'))).toHaveLength(1)
  })
})
