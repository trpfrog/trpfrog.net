import { safeValidateUnknown } from '@trpfrog.net/utils'
import dedent from 'ts-dedent'
import * as v from 'valibot'

import type { ImagePrompt } from '../domain/entities/generation-result'
import type { ChatLLMJson, ChatUtterance } from '../domain/services/llm'

const FinalPromptSchema = v.looseObject({
  prompt: v.string(),
  translated: v.string(),
})

export function generatePromptFromWordsUseCase(deps: { jsonChatbot: ChatLLMJson }) {
  return async (
    sourceWords: string[],
    options?: { includeRaw?: boolean },
  ): Promise<ImagePrompt & { raw?: unknown }> => {
    if (!Array.isArray(sourceWords) || sourceWords.length === 0) {
      throw new Error('Invalid input words')
    }

    const system = dedent`
      You are a prompt writer for Stable Diffusion.
      Think INTERNALLY using your reasoning. Do NOT reveal chain-of-thought.
      Output STRICT JSON only.

      ## HARD CONSTRAINTS (English "prompt"):
      - Single, complete sentence **without terminal punctuation**
      - Start with "tsmami-san" (lowercase)
      - 15 words or fewer
      - SFW, inclusive, coherent; avoid camera jargon overload

      ## HARD CONSTRAINTS (Japanese "translated"):
      - Full sentence **without** 「。」 at the end
      - "tsmami" must be translated as 「つまみさん」
      - Ends with 「〜するつまみさん」 or 「〜なつまみさん」 (a relative clause modifying つまみさん)

      ## Prompting Best Practices  ${/** Source: https://ai.google.dev/gemini-api/docs/image-generation#best-practices */ ''}

      > To elevate your results from good to great, incorporate these professional strategies into your workflow.

      > Be Hyper-Specific: The more detail you provide, the more control you have. Instead of "fantasy armor," describe it: "ornate elven plate armor, etched with silver leaf patterns, with a high collar and pauldrons shaped like falcon wings."
      > Provide Context and Intent: Explain the purpose of the image. The model's understanding of context will influence the final output. For example, "Create a logo for a high-end, minimalist skincare brand" will yield better results than just "Create a logo."
      > Use Step-by-Step Instructions: For complex scenes with many elements, break your prompt into steps. "First, create a background of a serene, misty forest at dawn. Then, in the foreground, add a moss-covered ancient stone altar. Finally, place a single, glowing sword on top of the altar."
      > Use "Semantic Negative Prompts": Instead of saying "no cars," describe the desired scene positively: "an empty, deserted street with no signs of traffic."
      > Control the Camera: Use photographic and cinematic language to control the composition. Terms like wide-angle shot, macro shot, low-angle perspective.

      ## OUTPUT FORMAT (STRICT):
      {
        "prompt": "<English prompt used to generate the image>",
        "translated": "<Translated Japanese prompt>"
      }

      Output JSON only. No code fences, no commentary.
    `

    const user = dedent`
      INPUT WORDS:
      ${sourceWords.join(', ')}

      Produce the JSON now.
    `

    const chat: ChatUtterance[] = [
      { role: 'system', text: system },
      { role: 'user', text: user },
    ]

    const { response: rawJson, modelName, raw } = await deps.jsonChatbot(chat)

    const parsed = safeValidateUnknown(FinalPromptSchema, rawJson)
    if (!parsed.success) {
      throw new Error('Failed to parse chatbot response JSON')
    }

    const finalEn = parsed.output.prompt
    const finalJa = parsed.output.translated

    const payload: ImagePrompt & { raw?: unknown } = {
      ...parsed.output,
      translated: finalJa,
      text: finalEn,
      author: modelName?.trim() ?? 'unknown',
    }

    if (options?.includeRaw) {
      payload.raw = raw
    }

    return payload
  }
}
