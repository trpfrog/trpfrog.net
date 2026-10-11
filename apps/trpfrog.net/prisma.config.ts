/// <reference types="node" />

import { env } from 'node:process'

import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'src/prisma/schema.prisma',
  migrations: {
    path: 'src/prisma/migrations',
    seed: 'dotenv -e .env.local -- ts-node --compiler-options {"module":"CommonJS"} ./src/prisma/seed.ts',
  },
  datasource: {
    url: env.DATABASE_URL ?? '',
  },
})
