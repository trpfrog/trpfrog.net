import { vValidator } from '@hono/valibot-validator'
import { loadDefaultJapaneseParser } from 'budoux/dist'
import { Hono } from 'hono'
import * as v from 'valibot'

const budouXParser = loadDefaultJapaneseParser()

import { env } from '@/env/server'

function parse(text: string) {
  const separator = '<%FORCE-BREAK%>'
  return budouXParser
    .parse(text)
    .join(separator)
    .replaceAll('+', `${separator}+${separator}`)
    .replaceAll('(' + separator, '(')
    .replaceAll(separator + ')', ')')
    .replaceAll('(', separator + '(')
    .replaceAll(')', ')' + separator)
    .replaceAll(' ', '\u00a0') // &nbsp;
    .split(separator)
    .filter(Boolean)
}

export const app = new Hono().post(
  '/',
  vValidator(
    'header',
    v.object({
      'x-api-key': v.string(),
    }),
  ),
  vValidator(
    'json',
    v.object({
      text: v.string(),
    }),
  ),
  async c => {
    const { 'x-api-key': apiKey } = c.req.valid('header')
    console.log(`received request with api key: ${apiKey}, actual key: ${env.TRPFROG_ADMIN_KEY}`)
    if (apiKey !== env.TRPFROG_ADMIN_KEY) {
      return c.text('Unauthorized', 401)
    }
    const { text } = c.req.valid('json')
    const result = parse(text)
    console.log({ result })
    return c.json(result satisfies string[])
  },
)
