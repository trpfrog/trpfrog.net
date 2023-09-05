import { HfInference } from '@huggingface/inference'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { HumanMessage } from 'langchain/schema'
import { LRUCache } from 'lru-cache'
import { z } from 'zod'

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
  const prompt = [
    `Here are ${sourceWords.length} random words:\n`,
    ...sourceWords.map(word => `  - ${word}\n`),
    '\n',
    'Now, there is a image-generation AI based on diffusion models called `trpfrog-diffusion`.',
    'One of your task is to generate a prompt for the AI to generate an image based on the words above.\n',
    "  - You don't have to use all the words, but you can't use any other words.\n",
    '  - You must not use sensitive (e.g. sexual, violent) words. This is the very important rule.\n',
    '  - The prompt should starts with "a photo of" and includes "trpfrog". ("trpfrog" is a subject of the photo) \n',
    '  - You must not generate a sensitive prompt. This is also the very important rule.\n',
    '\n',
    'Here are some examples:\n',
    '  - a photo of trpfrog with a hat and a sword and a shield\n',
    '  - a photo of trpfrog playing soccer\n',
    '  - a photo of trpfrog in a forest\n',
    '\n',
    'Your task is process following tasks in order and answer it in JSON format:\n',
    '  "prompt": Generate a prompt for the AI to generate an image based on the words above in English.\n',
    '  "translated": Translate this prompt into plain Japanese. ',
    '(You do not need to translate "trpfrog" but rewrite it into "TrpFrog",',
    ' and you should try to translate English-specific words into Japanese using カタカナ.)\n',
    '\n',
    'Here is few examples:\n',
    '{ "prompt": "a photo of running trpfrog", "translated": "走る TrpFrog の画像" }\n',
    '{ "prompt": "a photo of trpfrog with a hat and a sword and a shield", "translated": "帽子と剣と盾を持った TrpFrog の画像" }\n',
  ].join('')

  const chat = new ChatOpenAI({ temperature: 0.3 })
  const response = await chat.call([new HumanMessage(prompt)])

  return z
    .object({
      prompt: z.string().transform(s => s.trim().toLowerCase()),
      translated: z.string(),
    })
    .parse(JSON.parse(response.content))
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

const promptCache = new LRUCache<string, GeneratedPrompt>({
  max: 1,
  ttl: 1000 * 60 * 60, // 1 hour
})

export async function generateRandomPrompt(): Promise<GeneratedPrompt> {
  if (promptCache.has('result')) {
    return promptCache.get('result') as GeneratedPrompt
  }
  const words = await fetchRandomWords(10)
  const result = await generateRandomTrpFrogPrompt(words)
  promptCache.set('result', result)
  return result
}
