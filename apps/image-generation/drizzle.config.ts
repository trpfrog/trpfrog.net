import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './migrations',
  schema: './src/infra/db/schema.ts',
  dialect: 'sqlite',
})
