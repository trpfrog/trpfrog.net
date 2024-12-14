import { testClient } from 'hono/testing'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { prepareUsecasesBuilder } from '../wire'

import { createApp } from '.'

const defaultDeps = {
  imageMetadataRepo: {
    getLatest: vi.fn(async () => ({
      id: '1',
      createdAt: new Date(),
      imageUri: 'http://example.com',
      prompt: { author: 'test', text: 'test', translated: 'test' },
      modelName: 'test',
    })),
    query: vi.fn(async () => []),
    amount: vi.fn(async () => 0),
    add: vi.fn(async () => {}),
    remove: vi.fn(async () => {}),
  },
  imageStoreRepo: {
    delete: vi.fn(async () => {}),
    upload: vi.fn(async () => 'http://example.com'),
    download: vi.fn(async () => new ArrayBuffer(0)),
  },
  textToImage: async () => ({
    image: new ArrayBuffer(0),
    extension: '.png',
    modelName: 'model',
  }),
  jsonChatbot: vi.fn(async () => ({
    response: {
      final: {
        prompt: 'prompt',
      },
      translated: 'translated',
    },
    modelName: 'model',
  })),
  generateSeedWords: async () => ['word1', 'word2'],
} satisfies Parameters<typeof prepareUsecasesBuilder>[0]

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
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2000-10-17'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return the current image', async () => {
    const app = createMockedClient()
    const res = await app.current.$get()
    expect(res.status).toBe(200)
    expect(await res.arrayBuffer()).toEqual(new ArrayBuffer(0))
  })

  it('should return the current metadata', async () => {
    const app = createMockedClient()
    const res = await app.current.metadata.$get()
    expect(res.status).toBe(200)

    const json = await res.json()
    expect(json).toMatchInlineSnapshot(`
      {
        "createdAt": "2000-10-17T00:00:00.000Z",
        "id": "1",
        "imageUri": "http://example.com",
        "modelName": "test",
        "prompt": {
          "author": "test",
          "text": "test",
          "translated": "test",
        },
      }
    `)
  })
  it('should update the image when force is true', async () => {
    const app = createMockedClient()
    const res = await app.update.$post({
      query: { force: 'true' },
      headers: { 'x-api-key': 'valid-api-key' },
    })
    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toEqual({ status: 'updated' })
  })

  it('should skip updating the image when force is false and image is not stale', async () => {
    const app = createMockedClient()
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
  })
})
