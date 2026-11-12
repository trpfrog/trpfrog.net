import { describe, expect, it } from 'vite-plus/test'

import { parseBlogPath } from './paths'

describe('parseBlogPath', () => {
  it.each([
    ['/blog/foo', { slug: 'foo', page: undefined }],
    ['/blog/foo/2', { slug: 'foo', page: '2' }],
    ['/blog/%E3%81%82', { slug: 'あ', page: undefined }],
  ])('parses %s', (path, expected) => {
    expect(parseBlogPath(path)).toEqual(expected)
  })

  it.each(['/blog', '/blog/tags/foo', '/blog/preview/foo', '/works', '/blog/a/b/c'])(
    'ignores %s',
    path => {
      expect(parseBlogPath(path)).toBeNull()
    },
  )
})
