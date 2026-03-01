import { defineConfig, mergeConfig } from 'vitest/config'

import configShared from '../../packages/config-vitest/vitest.shared.ts'

export default mergeConfig(
  configShared,
  defineConfig({
    test: {
      environment: 'node',
      passWithNoTests: true,
    },
  }),
)
