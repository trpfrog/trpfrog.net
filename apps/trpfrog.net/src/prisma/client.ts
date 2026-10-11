import { env } from 'node:process'

import { PrismaPlanetScale } from '@prisma/adapter-planetscale'
import * as v from 'valibot'

import { validateUnknown } from '@trpfrog.net/utils'

import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaPlanetScale({
  url: validateUnknown(v.optional(v.pipe(v.string(), v.url())), env.DATABASE_URL) ?? '',
})

export const prisma = new PrismaClient({ adapter })
