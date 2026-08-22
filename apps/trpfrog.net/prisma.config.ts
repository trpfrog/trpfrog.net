import { defineConfig } from 'prisma/config'

type RuntimeGlobals = typeof globalThis & {
  process?: {
    env?: Record<string, string | undefined>
  }
}

const databaseUrl = (globalThis as RuntimeGlobals).process?.env?.DATABASE_URL ?? ''

export default defineConfig({
  schema: 'src/prisma/schema.prisma',
  migrations: {
    path: 'src/prisma/migrations',
    seed: 'dotenv -e .env.local -- ts-node --compiler-options {"module":"CommonJS"} ./src/prisma/seed.ts',
  },
  datasource: {
    url: databaseUrl,
  },
})
