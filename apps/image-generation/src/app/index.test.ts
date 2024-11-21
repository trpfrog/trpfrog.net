import { testClient } from 'hono/testing'
import { describe, it, expect, vi } from 'vitest'

import { createApp } from '.'

import { RequiredDependencies } from '@/domain/deps'

const mockDependencies: RequiredDependencies = {
  fetchRandomWords: async () => ['word1', 'word2'],
  generateImage: async () => new ArrayBuffer(0),
  jsonChatbot: async () => ({ prompt: 'prompt', translated: 'translated' }),
  imageRepo: {
    read: {
      currentImage: async () => new ArrayBuffer(0),
      currentMetadata: async () => ({
        generatedTime: 0,
        prompt: 'prompt',
        translated: 'translated',
      }),
    },
    update: async () => {},
  },
}

function createMockedClient(partialDeps: Partial<RequiredDependencies>) {
  const app = createApp(() => ({
    ...mockDependencies,
    ...partialDeps,
  }))
  return testClient(app).icongen
}

describe('Image Generation App', () => {
  it('should return the current image', async () => {
    const fn = vi.fn().mockResolvedValue(new ArrayBuffer(0))
    const app = createMockedClient({
      imageRepo: {
        ...mockDependencies.imageRepo,
        read: {
          ...mockDependencies.imageRepo.read,
          currentImage: fn,
        },
      },
    })
    const res = await app.current.$get()
    expect(res.status).toBe(200)
    expect(await res.arrayBuffer()).toEqual(new ArrayBuffer(0))
    expect(fn).toHaveBeenCalledOnce()
  })

  it('should return the current metadata', async () => {
    const fn = vi.fn().mockResolvedValue({
      generatedTime: 0,
      prompt: 'prompt',
      translated: 'translated',
    })
    const app = createMockedClient({
      imageRepo: {
        ...mockDependencies.imageRepo,
        read: {
          ...mockDependencies.imageRepo.read,
          currentMetadata: fn,
        },
      },
    })

    const res = await app.current.metadata.$get()
    expect(res.status).toBe(200)

    const json = await res.json()
    expect(json).toEqual({
      generatedTime: 0,
      prompt: 'prompt',
      translated: 'translated',
    })
    expect(fn).toHaveBeenCalledOnce()
  })

  it('should update the image when force is true', async () => {
    const fn = vi.fn().mockResolvedValue({ updated: true })
    const app = createMockedClient({
      imageRepo: {
        ...mockDependencies.imageRepo,
        update: fn,
      },
    })
    const res = await app.update.$post({
      query: { force: 'true' },
      headers: { 'x-api-key': 'valid-api-key' },
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toEqual({ status: 'updated' })
    expect(fn).toHaveBeenCalledOnce()
  })

  it('should skip updating the image when force is false and image is not stale', async () => {
    const fn = vi.fn().mockResolvedValue({ updated: false, message: 'Image is not stale' })
    const app = createMockedClient({
      imageRepo: {
        ...mockDependencies.imageRepo,
        update: fn,
      },
    })
    const res = await app.update.$post({ query: { force: 'false' } })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toEqual({
      status: 'skipped',
      message: 'Image is not stale',
    })
    expect(fn).toHaveBeenCalledOnce()
  })
})
