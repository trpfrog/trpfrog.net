import path from 'node:path'

import { defineConfig } from 'vite-plus'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    isolate: true,
    clearMocks: true,
    restoreMocks: true,
    pool: 'threads',
    fileParallelism: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'lcov', 'html'],
      reportOnFailure: true,
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
    setupFiles: './vitest.setup.ts',
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@blog': path.resolve(import.meta.dirname, './src/app/blog'),
    },
    server: {
      deps: {
        inline: ['react-tweet'],
      },
    },
  },
})
