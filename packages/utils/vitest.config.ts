import configShared from '../../packages/config-vitest/vitest.shared.ts'
import { defineProject, mergeConfig } from 'vitest/config'

export default mergeConfig(configShared, defineProject({}))
