import { services } from '@trpfrog.net/constants'
import { createURL } from '@trpfrog.net/utils'
import { Env, Hono } from 'hono'
import { env } from 'hono/adapter'
import { basicAuth } from 'hono/basic-auth'
import { z } from 'zod'

import { fetchRandomWords } from './trpfrog-diffusion/fetchRandomWords'
import { generateRandomTrpFrogPrompt } from './trpfrog-diffusion/generateRandomPrompt'

export const adminApp = new Hono<Env>()

// Basic auth middleware
adminApp.use(async (c, next) => {
  if (env(c).NODE_ENV === 'development') {
    await next()
  } else {
    const { TRPFROG_FUNCTIONS_SECRET } = env(c)
    const handler = basicAuth({
      username: 'admin',
      password: z.string().parse(TRPFROG_FUNCTIONS_SECRET),
    })
    await handler(c, next)
  }
})

// Playground
adminApp.post('/playground/prompt', async c => {
  const { OPENAI_API_KEY } = env(c)
  const randomWords = await fetchRandomWords(10)
  const promptRes = await generateRandomTrpFrogPrompt(randomWords, z.string().parse(OPENAI_API_KEY))
  return c.json({
    usedWords: randomWords.join(','),
    ...promptRes,
  })
})

// Update image
adminApp.post('/force-update', c => {
  const { TRPFROG_FUNCTIONS_SECRET, NODE_ENV } = env(c)
  const node_env = z.enum(['development', 'production', 'test']).catch('production').parse(NODE_ENV)
  const endpoint = createURL('/update', services.imageGeneration.origin(node_env), {
    force: 'true',
  })
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': z.string().parse(TRPFROG_FUNCTIONS_SECRET),
    },
  })
})

// Admin page
adminApp.get('/', async c => {
  return c.html(
    <html>
      <head>
        <title>image-generation Admin page</title>
        <script
          src="https://unpkg.com/htmx.org@2.0.1"
          integrity="sha384-QWGpdj554B4ETpJJC9z+ZHJcA/i59TyjxEPXiiUgN2WmTyV5OEZWCD6gQhgkdpB/"
          crossorigin="anonymous"
        />
      </head>
      <body>
        <h1>image-generation admin page</h1>

        <h2>Current Image</h2>
        <img id="current-image" src="/icongen/current" />

        <h2>Metadata</h2>
        <pre id="current-metadata" hx-get="/icongen/current/metadata?pretty" hx-trigger="load">
          loading...
        </pre>

        <h2>Operations</h2>
        <button
          hx-post="/icongen/update"
          hx-trigger="click"
          hx-on="alert('Update Request has been triggered')"
        >
          Request Update
        </button>
        <button
          hx-post="/icongen/admin/force-update"
          hx-trigger="click"
          hx-on="alert('Force Update has been triggered')"
        >
          Force Update
        </button>

        <h2>Playground</h2>
        <h3>Generate prompt</h3>
        <button
          hx-post="/icongen/admin/playground/prompt?pretty"
          hx-trigger="click"
          hx-target="#playground-generate-prompt-result"
        >
          Generate Prompt
        </button>
        <pre id="playground-generate-prompt-result"></pre>
      </body>
    </html>,
  )
})
