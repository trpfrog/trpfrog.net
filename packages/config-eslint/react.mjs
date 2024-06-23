// @ts-check
import { createESLintConfig } from './base.mjs'
import pluginReact from 'eslint-plugin-react'

/**
 * ESLint config for React projects.
 * @param {import('typescript-eslint').ConfigWithExtends[]} userConfig
 * @returns
 */
export const createESLintConfigReact = (...userConfig) =>
  createESLintConfig({
    files: ['**/*.tsx'],
    plugins: {
      react: pluginReact,
    },
  })
