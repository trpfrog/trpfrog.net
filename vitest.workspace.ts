import react from '@vitejs/plugin-react'
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'apps/*',
  'packages/*',
  {
    extends: './vitest.config.ts',
    plugins: [react()],
    test: {
      globals: true,
      environment: 'happy-dom',
      css: {
        modules: {
          classNameStrategy: 'non-scoped',
        },
      },
    },
  },
])
