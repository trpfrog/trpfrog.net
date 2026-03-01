import react from '@vitejs/plugin-react'
import type { ViteUserConfig } from 'vitest/config'

const config: ViteUserConfig = {
  plugins: react() as NonNullable<ViteUserConfig['plugins']>,
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
  },
}

export default config
