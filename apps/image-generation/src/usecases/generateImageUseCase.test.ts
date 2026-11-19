import { describe, it, expect, vi, afterEach, beforeEach } from 'vite-plus/test'

import { createSingleDepsResolver } from '@trpfrog.net/utils'

import { GeneratedImage } from '../domain/entities/generation-result'
import {
  InvalidTextToImageInputError,
  UnexpectedTextToImageModelResponseError,
} from '../domain/services/text-to-image'
import type { TextToImage } from '../domain/services/text-to-image'
import { buildTsmamiImagePrompt, generateImageUseCase } from './generateImageUseCase'

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
      referenceImageBase64: '',
    })
    const result = await textToImage('prompt')
    expect(result).toMatchObject(defaultResponse)
  })

  it('passes the reference image to the model', async () => {
    const textToImage = vi.fn<TextToImage>(async () => ({
      extension: '.png',
      modelName: 'trpfrog-diffusion',
      image: new ArrayBuffer(0),
    }))
    const run = resolve({ textToImage, referenceImageBase64: 'AQID' })
    await run('prompt')
    expect(textToImage).toHaveBeenCalledWith(expect.any(String), ['AQID'])
  })

  describe('error cases', () => {
    beforeEach(() => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      return () => {
        warnSpy.mockRestore()
        errorSpy.mockRestore()
      }
    })

    it.each([
      { ErrorClass: InvalidTextToImageInputError, isAborted: true },
      { ErrorClass: UnexpectedTextToImageModelResponseError, isAborted: false },
      { ErrorClass: Error, isAborted: false },
    ])(
      'should retry or not retry when $ErrorClass is thrown',
      async ({ ErrorClass, isAborted }) => {
        const textToImageFn = vi.fn<TextToImage>(async () => {
          throw new ErrorClass()
        })
        const run = resolve({
          textToImage: textToImageFn,
          referenceImageBase64: '',
        })
        await expect(run('prompt')).rejects.toThrow('Failed to generate image')
        expect(textToImageFn).toHaveBeenCalledTimes(isAborted ? 1 : 3)
      },
    )
  })
})

describe('buildTsmamiImagePrompt', () => {
  it('builds labeled sections from an image brief', () => {
    const prompt = buildTsmamiImagePrompt('tsmami-san baking bread', {
      scene: 'A cozy bakery kitchen at dawn.',
      style: 'Soft watercolor with warm light.',
      composition: 'Eye-level medium shot.',
    })
    expect(prompt).toContain('Theme:\ntsmami-san baking bread')
    expect(prompt).toContain('Scene:\nA cozy bakery kitchen at dawn.')
    expect(prompt).toContain('Style:\nSoft watercolor with warm light.')
    expect(prompt).toContain('Composition:\nEye-level medium shot.')
    expect(prompt).toContain('Subject (tsmami-san):')
    expect(prompt).toContain('Constraints:')
  })

  it('omits brief sections for a caption-only prompt', () => {
    const prompt = buildTsmamiImagePrompt('tsmami-san baking bread')
    expect(prompt).toContain('Theme:\ntsmami-san baking bread')
    expect(prompt).not.toContain('Scene:')
    expect(prompt).not.toContain('Style:')
    expect(prompt).not.toContain('Composition:')
  })
})
