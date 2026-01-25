import configShared from '../../packages/config-vitest/vitest.shared.ts'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(configShared, defineConfig({}))
