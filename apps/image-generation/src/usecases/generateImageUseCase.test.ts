import { createSingleDepsResolver } from '@trpfrog.net/utils'
import { describe, it, expect, vi, afterEach } from 'vitest'

import { GeneratedImage } from '../domain/entities/generation-result'
import {
  InvalidTextToImageInputError,
  UnexpectedTextToImageModelResponseError,
} from '../domain/services/text-to-image'

import { generateImageUseCase } from './generateImageUseCase'

describe('generateImage', () => {
  const defaultResponse: GeneratedImage = {
    image: expect.any(ArrayBuffer),
    extension: '.png',
    modelName: 'trpfrog-diffusion',
  }

  const { resolve } = createSingleDepsResolver(generateImageUseCase)

  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  it('should generate a new image successfully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('dummy-image')),
    )

    const textToImage = resolve({
      textToImage: async () => ({
        extension: '.png',
        modelName: 'trpfrog-diffusion',
        image: new ArrayBuffer(0),
      }),
      assetsRepo: {
        fetch: async () => new Response(new ArrayBuffer(0)),
      },
    })
    const result = await textToImage('prompt')
    expect(result).toMatchObject(defaultResponse)
  })

  it.each([
    { ErrorClass: InvalidTextToImageInputError, isAborted: true },
    { ErrorClass: UnexpectedTextToImageModelResponseError, isAborted: false },
    { ErrorClass: Error, isAborted: false },
  ])('should retry or not retry when $ErrorClass is thrown', async ({ ErrorClass, isAborted }) => {
    // fetch をモック（文字列レスポンス）
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('dummy-image')),
    )
    const textToImageFn = vi.fn(async () => {
      throw new ErrorClass()
    })
    const run = resolve({
      textToImage: textToImageFn,
      assetsRepo: {
        fetch: async () => new Response(new ArrayBuffer(0)),
      },
    })
    await expect(run('prompt')).rejects.toThrow('Failed to generate image')
    expect(textToImageFn).toHaveBeenCalledTimes(isAborted ? 1 : 3)
  })
})
