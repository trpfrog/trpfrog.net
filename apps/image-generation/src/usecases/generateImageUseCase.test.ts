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
    })
    const result = await textToImage('prompt', { numberOfRetries: 1 })
    expect(result).toMatchObject(defaultResponse)
  })

  it('should retry if image generation fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const mock = vi.fn(() => {
      throw new Error('Failed to generate image')
    })
    const textToImage = resolve({
      textToImage: mock,
    })

    const promise = textToImage('prompt', { numberOfRetries: 10 })
    await expect(promise).rejects.toThrow('Failed to generate image')
    expect(mock).toHaveBeenCalledTimes(10)
    errorSpy.mockRestore()
  })

  it('should retry if image generation fails and succeed', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const mock = vi
      .fn()
      .mockRejectedValueOnce(new Error('Failed to generate image'))
      .mockResolvedValueOnce({
        extension: '.png',
        modelName: 'trpfrog-diffusion',
        image: new ArrayBuffer(0),
      })
    const textToImage = resolve({
      textToImage: mock,
    })

    const result = await textToImage('prompt', { numberOfRetries: 2 })
    expect(result).toMatchObject(defaultResponse)
    expect(mock).toHaveBeenCalledTimes(2)
    errorSpy.mockRestore()
  })
})
