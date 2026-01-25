import path from 'path'

import { defineConfig, mergeConfig } from 'vitest/config'

import configShared from '../../packages/config-vitest/vitest.shared.ts'

export default mergeConfig(
  configShared,
  defineConfig({
    test: {
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
  }),
)
