import * as path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './vitest.setup.ts',
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@blog': path.resolve(__dirname, './src/app/blog'),
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
})
