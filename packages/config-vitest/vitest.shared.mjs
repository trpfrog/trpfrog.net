import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    isolate: true,
    clearMocks: true,
    restoreMocks: true,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
})
