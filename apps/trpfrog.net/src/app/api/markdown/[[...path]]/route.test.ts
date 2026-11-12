// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { resolveMarkdown } from '@/lib/agent-markdown/resolve'

import { GET } from './route'

vi.mock('@/lib/agent-markdown/resolve', () => ({
  resolveMarkdown: vi.fn<typeof resolveMarkdown>(),
}))

beforeEach(() => {
  vi.mocked(resolveMarkdown).mockResolvedValue({ body: '# hello', status: 200 })
})

const call = (path?: string[]) =>
  GET(new Request('https://trpfrog.net/api/markdown'), { params: Promise.resolve({ path }) })

describe('markdown GET', () => {
  it.each([
    [undefined, '/'],
    [['blog'], '/blog'],
    [['blog', 'walk'], '/blog/walk'],
    [['blog', 'walk.md'], '/blog/walk'],
    [['blog', 'walk', '2.md'], '/blog/walk/2'],
    [['blog', 'tags', '徒歩'], '/blog/tags/%E5%BE%92%E6%AD%A9'],
  ])('resolves %j as %s', async (segments, path) => {
    await call(segments)
    expect(resolveMarkdown).toHaveBeenCalledWith(path)
  })

  it('responds with Markdown and the resolved status', async () => {
    vi.mocked(resolveMarkdown).mockResolvedValueOnce({ body: '# 404', status: 404 })
    const res = await call(['nope'])
    expect(res.status).toBe(404)
    expect(res.headers.get('content-type')).toBe('text/markdown; charset=utf-8')
    expect(await res.text()).toBe('# 404')
  })
})
