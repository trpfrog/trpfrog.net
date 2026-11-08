import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import {
  InvalidTextToImageInputError,
  UnexpectedTextToImageModelResponseError,
} from '../../domain/services/text-to-image'
import { createOpenAIImageGenerator } from './text-to-image'

const PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

function generate() {
  const textToImage = createOpenAIImageGenerator({
    modelName: 'test-model',
    timeoutMs: 1000,
    apiKey: 'dummy',
  })
  return textToImage('prompt', [PNG_BASE64])
}

describe('createOpenAIImageGenerator', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('returns the generated image', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>(async () =>
        Response.json({ created: 0, data: [{ b64_json: PNG_BASE64 }] }),
      ),
    )

    await expect(generate()).resolves.toMatchObject({
      modelName: 'test-model',
      extension: '.png',
      image: expect.any(ArrayBuffer),
    })
  })

  it.each([
    { status: 400, body: '{"error":{"message":"bad"}}', ErrorClass: InvalidTextToImageInputError },
    {
      status: 429,
      body: '{"error":{"message":"slow"}}',
      ErrorClass: UnexpectedTextToImageModelResponseError,
    },
    {
      status: 500,
      body: '{"error":{"message":"oops"}}',
      ErrorClass: UnexpectedTextToImageModelResponseError,
    },
    { status: 200, body: 'not json', ErrorClass: UnexpectedTextToImageModelResponseError },
  ])('maps a $status response to $ErrorClass.name', async ({ status, body, ErrorClass }) => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>(
        async () => new Response(body, { status, headers: { 'content-type': 'application/json' } }),
      ),
    )

    await expect(generate()).rejects.toBeInstanceOf(ErrorClass)
  })
})
