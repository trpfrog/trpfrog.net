import { endpoints } from '@trpfrog.net/constants'
import { hc } from 'hono/client'

import { NODE_ENV } from '@/env/client.ts'

import type { AppType } from './[[...route]]/route.ts'

const baseUrl = typeof window === 'undefined' ? endpoints(NODE_ENV).website : window.location.origin

export const bffClient = hc<AppType>(baseUrl).api
