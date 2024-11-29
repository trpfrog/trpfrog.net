import { createSingleDepsResolver } from '@trpfrog.net/utils'
import { describe, it, expect, vi, afterEach } from 'vitest'

import { usecase_generateImage } from './generate-image'

import { ImageGenerationResult } from '@/domain/entities/generation-result'

describe('generateImage', () => {
  const defaultResponse: ImageGenerationResult = {
    generatedTime: expect.any(Number),
    arrayBuffer: expect.any(ArrayBuffer),
  }

  const { resolve } = createSingleDepsResolver(usecase_generateImage)

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should generate a new image successfully', async () => {
    const textToImage = resolve({
      textToImage: async () => new ArrayBuffer(0),
    })
    const result = await textToImage('prompt', { numberOfRetries: 1 })
    expect(result).toMatchObject(defaultResponse)
  })

  it('should retry if image generation fails', async () => {
    const mock = vi.fn(() => {
      throw new Error('Failed to generate image')
    })
    const textToImage = resolve({
      textToImage: mock,
    })

    const promise = textToImage('prompt', { numberOfRetries: 10 })
    expect(promise).rejects.toThrow('Failed to generate image')
    expect(mock).toHaveBeenCalledTimes(10)
  })

  it('should retry if image generation fails and succeed', async () => {
    const mock = vi
      .fn()
      .mockRejectedValueOnce(new Error('Failed to generate image'))
      .mockResolvedValueOnce(new ArrayBuffer(0))
    const textToImage = resolve({
      textToImage: mock,
    })

    const result = await textToImage('prompt', { numberOfRetries: 2 })
    expect(result).toMatchObject(defaultResponse)
    expect(mock).toHaveBeenCalledTimes(2)
  })
})
