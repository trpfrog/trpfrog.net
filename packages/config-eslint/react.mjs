// @ts-check
import { createESLintConfig } from './base.mjs'
import pluginReact from 'eslint-plugin-react'

const namePrefix = '@trpfrog.net/config-eslint/react'

/**
 * ESLint config for React projects.
 * @param {import('typescript-eslint').ConfigWithExtends[]} userConfig
 * @returns
 */
export const createESLintConfigReact = (...userConfig) =>
  createESLintConfig({
    name: `${namePrefix}/plugins`,
    files: ['**/*.tsx'],
    plugins: {
      react: pluginReact,
    },
  })
