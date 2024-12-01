import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { basicAuth } from 'hono/basic-auth'
import { z } from 'zod'

import { Env } from '../env'

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
  const randomWords = await c.var.UCS.generateRandomWords()
  const promptRes = await c.var.UCS.generatePromptFromWords(randomWords)
  return c.json({
    usedWords: randomWords.join(','),
    ...promptRes,
  })
})

// Update image
adminApp.post('/force-update', async c => {
  await c.var.UCS.refreshImageIfStale({ forceUpdate: true })
  return c.json({
    success: true,
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
