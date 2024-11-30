import { testClient } from 'hono/testing'
import { describe, it, expect, vi } from 'vitest'

import { createApp } from '.'

import { prepareUsecasesBuilder } from '@/usecases'

const defaultDeps = {
  imageRepo: {
    read: {
      currentImage: async () => new ArrayBuffer(0),
      currentMetadata: async () => ({
        generatedTime: 0,
        prompt: 'prompt',
        translated: 'translated',
      }),
    },
    update: vi.fn(),
  },
  textToImage: async () => new ArrayBuffer(0),
  jsonChatbot: async () => ({
    final: {
      prompt: 'prompt',
    },
    translated: 'translated',
  }),
  generateSeedWords: async () => ['word1', 'word2'],
}

type DepBuilder = ReturnType<typeof prepareUsecasesBuilder>

function createMockedClient(
  overrides: Partial<typeof defaultDeps> = {},
  inject: (injector: DepBuilder) => DepBuilder = x => x,
) {
  const ucsBuilder = prepareUsecasesBuilder({
    ...defaultDeps,
    ...overrides,
  })
  const app = createApp(() => inject(ucsBuilder).build())
  return testClient(app).icongen
}

describe('Image Generation App', () => {
  it('should return the current image', async () => {
    const fn = vi.fn().mockResolvedValue(new ArrayBuffer(0))
    const app = createMockedClient({
      imageRepo: {
        ...defaultDeps.imageRepo,
        read: {
          ...defaultDeps.imageRepo.read,
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
        ...defaultDeps.imageRepo,
        read: {
          ...defaultDeps.imageRepo.read,
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
        ...defaultDeps.imageRepo,
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
        read: {
          ...defaultDeps.imageRepo.read,
          currentMetadata: async () => ({
            generatedTime: Date.now(),
            prompt: 'prompt',
            translated: 'translated',
          }),
        },
        update: fn,
      },
    })
    const res = await app.update.$post({ query: { force: 'false' } })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toEqual({
      status: 'skipped',
      message: expect.any(String),
    })
    // @ts-expect-error - json.message is not typed
    expect(json.message).toMatchInlineSnapshot(
      `"Minimum update interval is 180 minutes, please wait 180 minutes."`,
    )
    expect(fn).not.toHaveBeenCalled()
  })
})
