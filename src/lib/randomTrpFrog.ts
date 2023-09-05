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
        'The user inputs some words.',
        'Now, there is a image-generation AI based on diffusion models called `trpfrog-diffusion`.',
        'One of your task is to generate a prompt for the AI to generate an image based on the words above.\n',
        "  - You don't have to use all the words, but you can't use any other words.\n",
        '  - You must not use sensitive (e.g. sexual, violent) words. This is the very important rule.\n',
        '  - The prompt should starts with "a photo of" and includes "trpfrog". ("trpfrog" is a subject of the photo) \n',
        '  - You must not generate a sensitive prompt. This is also the very important rule.\n',
        '\n',
        'Your task is process following tasks in order and answer it in JSON format:\n',
        '  "prompt": Generate a prompt for the AI to generate an image based on the words above in English.\n',
        '  "translated": Translate this prompt into plain Japanese. ',
        '("trpfrog" is "つまみさん" in Japanese,',
        ' and you should try to translate English-specific words into Japanese using カタカナ.)\n',
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
