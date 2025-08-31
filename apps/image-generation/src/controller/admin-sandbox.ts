import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import * as v from 'valibot'

import { base64ArrayBuffer } from '../lib/base64'

import { requiresApiKey } from './middlewares'

import type { Env } from '../env'

const PromptFromWordsSchema = v.object({
  words: v.array(v.string()),
})

const ImageFromTextSchema = v.object({
  text: v.string(),
})

export const adminSandboxApp = new Hono<Env>()
  .get('/seed-words', requiresApiKey(), async c => {
    const words = await c.var.UCS.generateRandomWords()
    return c.json({ words })
  })
  .post('/prompt', requiresApiKey(), sValidator('json', PromptFromWordsSchema), async c => {
    const { words } = c.req.valid('json')
    if (words.length === 0) {
      return c.json({ error: 'words must not be empty' }, 400)
    }
    const prompt = await c.var.UCS.generatePromptFromWords(words, { includeRaw: true })
    return c.json(prompt)
  })
  .post('/image', requiresApiKey(), sValidator('json', ImageFromTextSchema), async c => {
    const { text } = c.req.valid('json')
    const generated = await c.var.UCS.generateImage(text)
    const base64 = base64ArrayBuffer(generated.image)
    return c.json({
      modelName: generated.modelName,
      extension: generated.extension,
      base64,
    })
  })
