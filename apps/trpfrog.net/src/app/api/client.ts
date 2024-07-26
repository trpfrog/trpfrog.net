import { endpoints } from '@trpfrog.net/constants'
import { hc } from 'hono/client'

import { clientEnv } from '@/env/client.ts'

import type { AppType } from './[[...route]]/route.ts'

const baseUrl =
  typeof window === 'undefined' ? endpoints(clientEnv.NODE_ENV).website : window.location.origin

export const bffClient = hc<AppType>(baseUrl).api
