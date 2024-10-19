import { services } from '@trpfrog.net/constants'
import { hc } from 'hono/client'

import { NODE_ENV } from '@/env/client.ts'

import type { AppType } from './[[...route]]/route.ts'

const baseUrl =
  typeof window === 'undefined' ? services.website.endpoint(NODE_ENV) : window.location.origin

export const bffClient = hc<AppType>(baseUrl).api
