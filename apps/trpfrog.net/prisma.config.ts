import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'src/prisma/schema.prisma',
  migrations: {
    path: 'src/prisma/migrations',
    seed: 'dotenv -e .env.local -- ts-node --compiler-options {"module":"CommonJS"} ./src/prisma/seed.ts',
  },
})
