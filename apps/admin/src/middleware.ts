import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { handle } from 'hono/vercel'
import { NextResponse } from 'next/server'

import { env } from './env'

const app = new Hono()
  .use(
    basicAuth({
      username: 'admin',
      password: env.ADMIN_PASSWORD,
    }),
  )
  // NextResponse.next() を返すことで Next.js のルーティングを継続
  .all('*', () => NextResponse.next())

export const middleware = handle(app)
