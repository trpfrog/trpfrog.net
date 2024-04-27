import configShared from '@trpfrog.net/config-vitest'
import { defineProject, mergeConfig } from 'vitest/config'

export default mergeConfig(configShared, defineProject({}))
