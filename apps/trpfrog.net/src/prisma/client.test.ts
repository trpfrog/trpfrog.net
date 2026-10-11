// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'

vi.mock('@/env/server', () => {
  throw new Error('The shared Prisma client must not load Next-only environment configuration')
})

describe('Prisma client configuration', () => {
  beforeEach(() => vi.resetModules())
  afterEach(() => vi.unstubAllEnvs())

  it.each(['https://example.invalid', undefined])(
    'initializes without a database query or Next-only configuration (%s)',
    async databaseUrl => {
      vi.stubEnv('DATABASE_URL', databaseUrl)
      const { prisma } = await import('./client')
      expect(prisma.tweet.findMany).toBeTypeOf('function')
      await prisma.$disconnect()
    },
  )

  it('rejects an invalid database URL before connecting', async () => {
    vi.stubEnv('DATABASE_URL', 'not-a-url')
    await expect(import('./client')).rejects.toThrow('Invalid URL')
  })
})
