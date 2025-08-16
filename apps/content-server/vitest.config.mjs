import configShared from '@trpfrog.net/config-vitest'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
  configShared,
  defineConfig({
    test: {
      environment: 'node',
    },
  }),
)
