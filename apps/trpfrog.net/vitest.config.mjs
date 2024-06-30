// @ts-check
import path from 'path'

import configShared from '@trpfrog.net/config-vitest'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
  configShared,
  defineConfig({
    test: {
      setupFiles: './vitest.setup.mjs',
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
        '@blog': path.resolve(import.meta.dirname, './src/app/blog'),
      },
    },
  }),
)
