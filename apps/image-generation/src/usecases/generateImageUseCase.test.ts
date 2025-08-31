import { createSingleDepsResolver } from '@trpfrog.net/utils'
import { describe, it, expect, vi, afterEach } from 'vitest'

import { GeneratedImage } from '../domain/entities/generation-result'

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
  })

  it('should generate a new image successfully', async () => {
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
})
