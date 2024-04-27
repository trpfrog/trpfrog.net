import { BaseMessageChunk, HumanMessage } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'
import { retrieveAllPostSlugs } from '@trpfrog.net/posts'
import { NextRequest, NextResponse } from 'next/server'

import { createRateLimit } from '@/lib/rateLimit'

const limiter = createRateLimit({
  interval: 60 * 1000 * 60, // 1 hour
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

const pagePaths = [
  'balloon',
  'blog',
  'certification',
  'download',
  'environment',
  'icon-maker',
  'icons',
  'legal',
  'links',
  'music',
  'stickers',
  'toppage',
  'walking',
  'works',
]

let blogPaths = [] as string[]

const chat = new ChatOpenAI({ temperature: 0 })

type GETProps = {
  params: {
    input: string
  }
}

function extractTextFromBaseMessageChunk(chunk: BaseMessageChunk) {
  const content = chunk.content
  if (typeof content === 'string') {
    return content
  } else {
    const content = chunk.content[0]
    if (typeof content === 'string') {
      return content
    }
    if (content.type === 'text') {
      return content.text
    }
  }
  return ''
}

export async function GET(req: NextRequest, props: GETProps) {
  const res = NextResponse.next()

  const input = props.params.input.slice(0, 100)

  if (blogPaths.length === 0) {
    blogPaths = await retrieveAllPostSlugs()
  }

  const prompt =
    'The following gives the "search target list" and "input". ' +
    'You are to find the string X in the "search target list" ' +
    'that you consider to be the most CLOSE to the "input", ' +
    'taking into account both "edit distance" and "semantic proximity". ' +
    'At this time, more consideration should be given to the edit distance. ' +
    'Then output X to a line.\n' +
    '\n' +
    '### search target list ###\n' +
    '\n' +
    pagePaths.map(s => '- ' + s + '\n').join('') +
    blogPaths.map(s => '- ' + s + '\n').join('') +
    '\n' +
    '### input ###\n' +
    '\n' +
    input +
    '\n' +
    '\n' +
    '### output ###\n'

  try {
    await limiter.check(res, 5, req.ip ?? 'ip_not_found')
    const chatResponse = await chat.invoke([new HumanMessage(prompt)])
    const output = extractTextFromBaseMessageChunk(chatResponse)
    const url = blogPaths.includes(output) ? '/blog/' + output : '/' + output
    return NextResponse.redirect(new URL(url, req.url))
  } catch {
    return NextResponse.redirect(new URL('/', req.url))
  }
}
