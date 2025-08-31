'use server'

import { createTrpFrogImageGenerationClientFromOrigin } from '@trpfrog.net/image-generation'

import { env } from '@/env'

function client(origin: string) {
  return createTrpFrogImageGenerationClientFromOrigin(origin)
}

export async function fetchSeedWords(origin: string) {
  const res = await client(origin).generate['seed-words'].$get({
    header: {
      'x-api-key': env.TRPFROG_FUNCTIONS_SECRET,
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch seed words')
  }
  const json = (await res.json()) as { words: string[] }
  return json.words
}

export type GeneratedPrompt = {
  author: string
  text: string
  translated: string
}

export async function generatePromptFromWords(
  words: string[],
  origin: string,
): Promise<GeneratedPrompt> {
  const res = await client(origin).generate.prompt.$post({
    json: { words },
    header: {
      'x-api-key': env.TRPFROG_FUNCTIONS_SECRET,
    },
  })
  if (!res.ok) {
    throw new Error('Failed to generate prompt')
  }
  return (await res.json()) as GeneratedPrompt
}

export type GeneratedImageBase64 = {
  dataUrl: string
  modelName: string
  extension: string
}

export async function generateImageFromText(
  text: string,
  origin: string,
): Promise<GeneratedImageBase64> {
  const res = await client(origin).generate.image.$post({
    json: { text },
    header: {
      'x-api-key': env.TRPFROG_FUNCTIONS_SECRET,
    },
  })
  if (!res.ok) {
    throw new Error('Failed to generate image')
  }
  const json = (await res.json()) as { base64: string; extension: string; modelName: string }
  return {
    dataUrl: `data:image/${json.extension};base64,${json.base64}`,
    extension: json.extension,
    modelName: json.modelName,
  }
}
