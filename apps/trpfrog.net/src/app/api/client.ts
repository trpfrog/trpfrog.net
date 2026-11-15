import { hc } from 'hono/client'

import { services } from '@trpfrog.net/constants'

import { NODE_ENV } from '@/env/client.ts'

import type { AppType } from './[[...route]]/route.ts'

const baseUrl =
  typeof window === 'undefined'
    ? // portless を通さずに起動したときは自分の PORT を見る
      (services.website.origin(NODE_ENV) ?? `http://localhost:${process.env.PORT ?? 3000}`)
    : window.location.origin

export const bffClient = hc<AppType>(baseUrl).api
