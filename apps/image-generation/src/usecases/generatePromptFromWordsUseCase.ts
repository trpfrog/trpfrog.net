import pRetry from 'p-retry'
import dedent from 'ts-dedent'
import * as v from 'valibot'

import { safeValidateUnknown } from '@trpfrog.net/utils'

import type { ImageBrief, ImagePrompt } from '../domain/entities/generation-result'
import type { ChatLLMJson, ChatUtterance } from '../domain/services/llm'

const MAX_PROMPT_CHARS = 80
const MAX_PROMPT_WORDS = 12

const nonEmptyString = (name: string) =>
  v.pipe(
    v.string(`\`${name}\` must be a string`),
    v.trim(),
    v.minLength(1, `\`${name}\` must not be empty`),
  )

const FinalPromptSchema = v.looseObject({
  prompt: v.pipe(
    nonEmptyString('prompt'),
    v.maxLength(
      MAX_PROMPT_CHARS,
      ({ received }) =>
        `"prompt" must be at most ${MAX_PROMPT_CHARS} characters (current: ${received})`,
    ),
    v.maxWords(
      'en',
      MAX_PROMPT_WORDS,
      ({ received }) => `"prompt" must be at most ${MAX_PROMPT_WORDS} words (current: ${received})`,
    ),
    v.includes('tsmami-san', '`prompt` must include "tsmami-san"'),
    v.check(e => !/[.,]$/.test(e), '`prompt` must not end with punctuation'),
  ),
  translated: v.pipe(
    nonEmptyString('translated'),
    v.check(e => !/[。.、,]$/.test(e), '`translated` must not end with punctuation'),
  ),
  scene: v.optional(nonEmptyString('scene')),
  style: v.optional(nonEmptyString('style')),
  composition: v.optional(nonEmptyString('composition')),
})

/**
 * Structured Outputs (strict) 用の JSON Schema。
 * 文字数などの細かい制約は表現できないので、受け取った後に FinalPromptSchema で検証する。
 */
const OUTPUT_JSON_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['prompt', 'translated', 'scene', 'style', 'composition'],
  properties: {
    prompt: {
      type: 'string',
      description: `Short English caption shown to viewers. Includes "tsmami-san". At most ${MAX_PROMPT_WORDS} words and ${MAX_PROMPT_CHARS} characters, no terminal punctuation.`,
    },
    translated: {
      type: 'string',
      description:
        'Natural Japanese translation of the caption, ending with 「〜するつまみさん」 or 「〜なつまみさん」, without 「。」.',
    },
    scene: {
      type: 'string',
      description:
        'Two to four English sentences describing the setting, what tsmami-san is doing, and the key props, with concrete visible details.',
    },
    style: {
      type: 'string',
      description:
        'One or two English sentences naming the art medium or rendering style, lighting, and color palette.',
    },
    composition: {
      type: 'string',
      description: 'One English sentence on framing and viewpoint for a square image.',
    },
  },
} as const satisfies Record<string, unknown>

class InvalidModelOutputError extends Error {
  modelResponse: string
  constructor(modelResponse: string, message: string) {
    super(message)
    this.name = 'InvalidModelOutputError'
    this.modelResponse = modelResponse
  }
}

export type GeneratedPrompt = ImagePrompt & { brief: ImageBrief; raw?: unknown }

export function generatePromptFromWordsUseCase(deps: { jsonChatbot: ChatLLMJson }) {
  return async (
    sourceWords: string[],
    options?: { includeRaw?: boolean },
  ): Promise<GeneratedPrompt> => {
    if (!Array.isArray(sourceWords) || sourceWords.length === 0) {
      throw new Error('sourceWords must be a non-empty array of strings')
    }

    const system = dedent`
      You plan a daily illustration of "tsmami-san", a mascot character: a green sphere sitting inside a box (usually a cardboard box).
      From the given random words, invent one fun, specific, SFW scene featuring tsmami-san, and describe it for an image generation model.

      ## Caption ("prompt" / "translated")
      - "prompt": a single, complete English sentence without terminal punctuation
        - Must include "tsmami-san"
        - ${MAX_PROMPT_WORDS} words or fewer, ${MAX_PROMPT_CHARS} characters or fewer
      - "translated": a natural Japanese sentence without 「。」 at the end
        - "tsmami-san" must be translated as 「つまみさん」
        - Ends with 「〜するつまみさん」 or 「〜なつまみさん」 (a relative clause modifying つまみさん)

      ## Image description ("scene" / "style" / "composition")
      - Describe what should be visible, positively and concretely: materials, objects, setting, lighting, colors.
      - Pick an art style that suits the scene; it does not have to be the same every day.
      - Do not describe tsmami-san's body in detail (the image model receives a reference image), and never give it legs.
      - Do not request any text, letters, or logos in the image.
    `

    const user = dedent`
      Random words:
      ${sourceWords.join(', ')}
    `

    const chat: ChatUtterance[] = [
      { role: 'system', text: system },
      { role: 'user', text: user },
    ]

    const attempt = async () => {
      const {
        response: rawJson,
        modelName,
        raw,
      } = await deps.jsonChatbot(chat, {
        schema: OUTPUT_JSON_SCHEMA,
        schemaName: 'tsmami_illustration_plan',
      })

      const parsed = safeValidateUnknown(FinalPromptSchema, rawJson)
      if (!parsed.success) {
        throw new InvalidModelOutputError(
          JSON.stringify(rawJson, null, 2),
          'Output JSON validation failed:\n' + parsed.issues.map(i => `- ${i.message}`).join('\n'),
        )
      }

      const { prompt, translated, scene, style, composition } = parsed.output
      const payload: GeneratedPrompt = {
        text: prompt,
        translated,
        author: modelName?.trim() ?? 'unknown',
        brief: { caption: prompt, scene, style, composition },
      }
      if (options?.includeRaw) {
        payload.raw = raw
      }
      return payload
    }

    const payload = await pRetry(attempt, {
      retries: 3,
      minTimeout: 10,
      maxTimeout: 20,
      onFailedAttempt: ({ error }) => {
        if (error instanceof InvalidModelOutputError) {
          // Feed the content of the parse error back to the LLM and retry
          chat.push({ role: 'assistant', text: error.modelResponse })
          chat.push({ role: 'user', text: error.message })
        }
      },
    })

    return payload
  }
}
