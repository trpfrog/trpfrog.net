import { PrismaPlanetScale } from '@prisma/adapter-planetscale'

import { env } from '@/env/server'

import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaPlanetScale({
  url: env.DATABASE_URL ?? '',
})

export const prisma = new PrismaClient({ adapter })
