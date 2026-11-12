// @vitest-environment node
import { createHash } from 'node:crypto'

import { NextRequest } from 'next/server'

import { describe, expect, it, vi } from 'vite-plus/test'

import { GET as apiGet } from '@/app/api/[[...route]]/route'
import { GET as mcpGet } from '@/app/mcp/[[...route]]/route'
import type { getPost, listTags, searchPosts } from '@/lib/agent-api/blog'
import { agentSkillsIndex, aiCatalog, apiCatalog } from '@/lib/agent-api/well-known'

import { GET } from './route'

vi.mock('@/lib/agent-api/blog', () => ({
  getPost: vi.fn<typeof getPost>(),
  listTags: vi.fn<typeof listTags>(),
  searchPosts: vi.fn<typeof searchPosts>(),
}))

const ORIGIN = 'https://trpfrog.net'
const get = (path: string) => GET(new NextRequest(`${ORIGIN}${path}`))

// 発見用ドキュメントに載せた URL を、それを配信する Route Handler で取得する
function fetchOwnUrl(url: string) {
  const { pathname } = new URL(url, ORIGIN)
  const request = new NextRequest(`${ORIGIN}${pathname}`)
  if (pathname.startsWith('/.well-known/')) return GET(request)
  if (pathname.startsWith('/mcp')) return mcpGet(request)
  if (pathname.startsWith('/api/')) return apiGet(request)
  return null
}

function collectHrefs(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(collectHrefs)
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, v]) =>
      (key === 'href' || key === 'url') && typeof v === 'string' ? [v] : collectHrefs(v),
    )
  }
  return []
}

describe('.well-known', () => {
  it.each([
    ['/.well-known/api-catalog', 'application/linkset+json'],
    ['/.well-known/ai-catalog.json', 'application/json'],
    ['/.well-known/ard.json', 'application/json'],
    ['/.well-known/agent-skills/index.json', 'application/json'],
    ['/.well-known/agent-skills/trpfrog-net/SKILL.md', 'text/markdown'],
    ['/.well-known/mcp/server-card.json', 'application/mcp-server-card+json'],
    ['/.well-known/poppy.json', 'application/json'],
  ])('serves %s as %s', async (path, type) => {
    const res = await get(path)
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain(type)
  })

  it('publishes the digest of the SKILL.md it serves', async () => {
    for (const skill of agentSkillsIndex.skills) {
      const body = await (await get(skill.url)).text()
      expect(skill.digest).toBe(`sha256:${createHash('sha256').update(body).digest('hex')}`)
    }
  })

  it.each(
    [...new Set(collectHrefs([apiCatalog, aiCatalog, agentSkillsIndex]))].filter(
      url =>
        new URL(url, ORIGIN).origin === ORIGIN &&
        /^\/(\.well-known|mcp|api)\//.test(`${new URL(url, ORIGIN).pathname}/`),
    ),
  )('links to %s, which exists', async url => {
    const res = await fetchOwnUrl(url)
    expect(res?.status).toBe(200)
  })

  it('returns problem+json for unknown documents', async () => {
    const res = await get('/.well-known/nope')
    expect(res.status).toBe(404)
    expect(res.headers.get('content-type')).toContain('application/problem+json')
  })
})
