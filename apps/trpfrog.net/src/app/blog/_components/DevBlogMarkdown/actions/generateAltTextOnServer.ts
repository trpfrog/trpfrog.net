'use server'

import { openai } from '@ai-sdk/openai'
import { toJsonSchema } from '@valibot/to-json-schema'
import { generateObject, jsonSchema } from 'ai'
import dedent from 'ts-dedent'
import * as v from 'valibot'

import { env } from '@/env/server'

const AltTextObjectSchema = v.object({
  altText: v.pipe(v.string(), v.description('Japanese alt text for the image')),
})

export async function generateAltTextOnServer(image: ArrayBuffer): Promise<string> {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Forbidden')
  }

  if (!env.OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API key in environment variables')
  }

  const { object: output } = await generateObject({
    model: openai('gpt-4o-2024-11-20'),
    schema: jsonSchema<v.InferOutput<typeof AltTextObjectSchema>>(
      toJsonSchema(AltTextObjectSchema),
    ),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: dedent`
              Based on the provided image, generate an alt text in Japanese.
              The alt text should accurately describe the content of the image and provide useful information to enhance accessibility.
              The alt text should be 30 - 50 characters long in Japanese.
            `,
          },
          {
            type: 'image',
            image,
          },
        ],
      },
    ],
  })

  return output.altText
}
