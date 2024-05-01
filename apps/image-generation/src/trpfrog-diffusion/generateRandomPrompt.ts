import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'

import { getShuffledArray } from '../lib/arrayHelpers'

const PromptSchema = z.object({
  prompt: z.string().transform(s => s.trim().toLowerCase()),
  translated: z.string(),
})

export type GeneratedPrompt = z.infer<typeof PromptSchema>

export async function generateRandomTrpFrogPrompt(
  sourceWords: string[],
  apiKey: string,
): Promise<GeneratedPrompt> {
  // Few-shot learning
  const chatInput = [
    new SystemMessage(
      [
        'The user will provide some words.',
        'Currently, there is an image-generation AI based on diffusion models named `trpfrog-diffusion`.',
        'One of your tasks is to generate a prompt for the AI to create an image based on the provided words.\n',
        "  - You don't need to use all the words, but you can't use any additional words.\n",
        '  - You must avoid using sensitive (e.g. sexual, violent) words. This is a crucial rule.\n',
        '  - The prompt should begin with "a photo of" and include "trpfrog". ("trpfrog" is the subject of the photo) \n',
        '  - You must not create a sensitive prompt. This is also a crucial rule.\n',
        '\n',
        'Your task is to complete the following tasks in order and provide the answer in JSON format:\n',
        '  "prompt": Generate a prompt for the AI to create an image based on the provided words in English.\n',
        '  "translated": Translate this prompt into simple Japanese. ',
        '("trpfrog" translates to "つまみさん" in Japanese,',
        ' and you should attempt to translate English-specific words into Japanese using カタカナ.)\n',
      ].join(''),
    ),
    new HumanMessage(getShuffledArray([...sourceWords.slice(1), 'running']).join(', ')),
    new AIMessage(
      JSON.stringify({
        prompt: 'a photo of running trpfrog',
        translated: '走るつまみさんの画像',
      }),
    ),
    new HumanMessage(getShuffledArray([...sourceWords.slice(2), 'hat', 'sword']).join(', ')),
    new AIMessage(
      JSON.stringify({
        prompt: 'a photo of trpfrog with a hat and a sword and a shield',
        translated: '帽子と剣と盾を持ったつまみさんの画像',
      }),
    ),
    new HumanMessage(sourceWords.join(', ')),
  ]

  const chat = new ChatOpenAI({
    temperature: 0.7,
    apiKey,
  })
  const reply = await chat.generate([chatInput])
  const json = JSON.parse(reply.generations[0][0].text)
  return z
    .object({
      prompt: z.string().transform(s => s.trim().toLowerCase()),
      translated: z.string(),
    })
    .parse(json)
}
