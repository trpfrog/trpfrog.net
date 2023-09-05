import { HfInference } from '@huggingface/inference'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIMessage, HumanMessage, SystemMessage } from 'langchain/schema'
import { z } from 'zod'

import { getShuffledArray } from '@/lib/arrayHelpers'
const hf = new HfInference(process.env.HUGGINGFACE_TOKEN)

async function fetchRandomWords(amount: number) {
  const apiUrl = 'https://random-word-api.herokuapp.com'
  const response = await fetch(`${apiUrl}/word?number=${amount}&lang=en`, {
    next: {
      revalidate: 3, // seconds
    },
  })
  const words = z
    .string()
    .array()
    .length(amount)
    .parse(await response.json())
  return words
}

async function generateRandomTrpFrogPrompt(sourceWords: string[]) {
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
    new HumanMessage(
      getShuffledArray([...sourceWords.slice(1), 'running']).join(', '),
    ),
    new AIMessage(
      JSON.stringify({
        prompt: 'a photo of running trpfrog',
        translated: '走るつまみさんの画像',
      }),
    ),
    new HumanMessage(
      getShuffledArray([...sourceWords.slice(2), 'hat', 'sword']).join(', '),
    ),
    new AIMessage(
      JSON.stringify({
        prompt: 'a photo of trpfrog with a hat and a sword and a shield',
        translated: '帽子と剣と盾を持ったつまみさんの画像',
      }),
    ),
    new HumanMessage(sourceWords.join(', ')),
  ]

  const chat = new ChatOpenAI({ temperature: 0.3 })
  const reply = await chat.call(chatInput).then(res => res.content)
  return z
    .object({
      prompt: z.string().transform(s => s.trim().toLowerCase()),
      translated: z.string(),
    })
    .parse(JSON.parse(reply))
}

export async function generateTrpFrogImage(prompt: string) {
  const responseBlob = await hf.textToImage(
    {
      model: 'Prgckwb/trpfrog-diffusion',
      inputs: prompt,
    },
    {
      use_cache: false,
      wait_for_model: true,
      retry_on_error: true,
    },
  )
  const arrayBuffer = await responseBlob.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')

  // if sensitive image is generated, huggingface returns a black image.
  // Base64 of this image contains "ooooAKKKKACiiigA" pattern.
  const invalidImagePattern = /(ooooAKKKKACiiigA){10,}/

  return {
    base64,
    success: !invalidImagePattern.test(base64),
  }
}

type GeneratedPrompt = {
  prompt: string
  translated: string
}

export async function generateRandomPrompt(): Promise<GeneratedPrompt> {
  const words = await fetchRandomWords(10)
  return await generateRandomTrpFrogPrompt(words)
}
