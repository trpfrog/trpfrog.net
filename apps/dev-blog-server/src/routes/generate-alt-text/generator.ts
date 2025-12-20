'use server'

import { openai, OpenAIResponsesProviderOptions } from '@ai-sdk/openai'
import { InferSchemaOutput } from '@trpfrog.net/utils'
import { toJsonSchema } from '@valibot/to-json-schema'
import { generateObject, jsonSchema } from 'ai'
import dedent from 'ts-dedent'
import * as v from 'valibot'

const AltTextObjectSchema = v.object({
  altText: v.pipe(v.string(), v.description('Japanese alt text for the image')),
})

export async function generateAltText(image: ArrayBuffer): Promise<string> {
  const { object: output } = await generateObject({
    model: openai('gpt-5.2'),
    schema: jsonSchema<InferSchemaOutput<typeof AltTextObjectSchema>>(
      toJsonSchema(AltTextObjectSchema),
    ),
    providerOptions: {
      openai: {
        reasoningEffort: 'low',
        serviceTier: 'flex',
      } satisfies OpenAIResponsesProviderOptions,
    },
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
