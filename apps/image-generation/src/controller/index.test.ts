import { testClient } from 'hono/testing'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { createImageMetadataRepoMock } from '../infra/repos/mocks/imageMetadataRepoMock'
import { createImageStoreRepoMock } from '../infra/repos/mocks/imageStoreRepoMock'
import { createImageUpdateStatusRepoMock } from '../infra/repos/mocks/imageUpdateStatusRepoMock'
import { prepareUsecasesBuilder } from '../wire'

import { createApp } from '.'

const createDefaultDeps = () =>
  ({
    imageMetadataRepo: createImageMetadataRepoMock([
      {
        id: '1',
        createdAt: new Date('2000-10-17'),
        imageUri: 'http://example.com',
        prompt: { author: 'test', text: 'test', translated: 'test' },
        modelName: 'test',
      },
    ]),
    imageStoreRepo: createImageStoreRepoMock(),
    imageUpdateStatusRepo: createImageUpdateStatusRepoMock(),
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
    assetsRepo: {
      fetch: async () => new Response(new ArrayBuffer(0)),
    },
  }) satisfies Parameters<typeof prepareUsecasesBuilder>[0]

type DepBuilder = ReturnType<typeof prepareUsecasesBuilder>

function createMockedClient(
  overrides: Partial<ReturnType<typeof createDefaultDeps>> = {},
  inject: (injector: DepBuilder) => DepBuilder = x => x,
) {
  // テスト間のステート汚染を防ぐため、毎回 fresh な Repo を用意する
  const ucsBuilder = prepareUsecasesBuilder({
    ...createDefaultDeps(),
    ...overrides,
  })
  const app = createApp(inject(ucsBuilder).build())
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
      header: { 'x-api-key': 'valid-api-key' },
    })
    expect(res.status).toBe(202)
    const json = await res.json()
    expect(json).toEqual({ status: 'accepted' })
  })

  it('should skip updating the image when force is false and image is not stale', async () => {
    const app = createMockedClient()
    const res = await app.update.$post({
      query: {},
      header: { 'x-api-key': 'valid-api-key' },
    })
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
