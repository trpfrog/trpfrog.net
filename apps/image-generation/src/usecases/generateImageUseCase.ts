import pRetry, { AbortError } from 'p-retry'
import dedent from 'ts-dedent'

import type { ImageBrief } from '../domain/entities/generation-result'
import { AssetsRepo } from '../domain/repos/assets-repo'
import { InvalidTextToImageInputError, TextToImage } from '../domain/services/text-to-image'
import { base64ArrayBuffer } from '../lib/base64'

/**
 * GPT Image 2.6 のプロンプトガイドに沿って、ラベル付きセクション
 * (reference / scene / subject / style / constraints) で指示を組み立てる。
 */
export function buildTsmamiImagePrompt(input: string | ImageBrief): string {
  const brief: ImageBrief = typeof input === 'string' ? { caption: input } : input

  const optionalSection = (label: string, body?: string) => (body ? `\n\n${label}:\n${body}` : '')

  return (
    dedent`
    Create a new square illustration of the character "tsmami-san" (also called つまみさん).

    Reference image:
    Image 1 is a character reference for tsmami-san only. Keep its identity, but do not copy its pose, framing, background, or art style.

    Theme:
    ${brief.caption}
  ` +
    optionalSection('Scene', brief.scene) +
    optionalSection('Style', brief.style) +
    optionalSection('Composition', brief.composition) +
    '\n\n' +
    dedent`
      Subject (tsmami-san):
      - A round green sphere sitting inside a box. It is always inside a box.
      - The box is usually a cardboard box, but another kind of box is fine if it suits the scene.
      - Usually a calm, neutral face like the reference. The sphere is usually green; another color is fine only if the scene calls for it.
      - The sphere has no arms and no legs.
      - If the scene needs hands, prefer using the box flaps as hands. Only as a last resort, add small, subtle hands in the same color as the sphere, emerging near the edge of the box. Never grow hands out of the box walls.
      - Never draw legs or feet. Choose a pose, viewpoint, or foreground object so that none are needed.
      - Render tsmami-san with materials and shading that match the chosen art style.

      Constraints:
      - A complete illustration with a fully drawn background that fits the scene; not a sticker or cutout.
      - No text, letters, captions, logos, signatures, or watermarks.
      - Keep it wholesome and family-friendly.
    `
  )
}

export function generateImageUseCase(deps: { textToImage: TextToImage; assetsRepo: AssetsRepo }) {
  return async (input: string | ImageBrief) => {
    const prompt = buildTsmamiImagePrompt(input)

    try {
      // FIXME: なぜか Workers Assets が取れないので一時的に Cloudinary から取ってくる。あとで deps.assetsRepo.fetch('/tsmami.png') にする
      const tsmamiImageBase64 = await fetch(
        'https://res.cloudinary.com/trpfrog/image/upload/f_png,c_limit,w_1024/icons_gallery/22.png',
        {
          // @ts-ignore -- Workers では cf を使えるが、client ビルド時に巻き込まれて TypeError が発生するので ignore する
          cf: {
            cacheTtl: 60 * 60 * 24 * 7,
          },
        },
      )
        .then(res => res.arrayBuffer())
        .then(ab => base64ArrayBuffer(ab))

      const attempt = async () => {
        try {
          return await deps.textToImage(prompt, [tsmamiImageBase64])
        } catch (e) {
          if (e instanceof InvalidTextToImageInputError) {
            // 入力起因のエラーはリトライしない
            throw new AbortError(e)
          }
          throw e
        }
      }

      return await pRetry(attempt, {
        retries: 2,
        minTimeout: 1000,
        maxTimeout: 5000,
        onFailedAttempt: ({ error, attemptNumber, retriesLeft }) => {
          console.warn(
            `[TextToImage] Attempt ${attemptNumber} failed: ${error.message}. Retries left: ${retriesLeft}`,
          )
        },
      })
    } catch (e) {
      console.error(e)
      throw new Error('Failed to generate image')
    }
  }
}
