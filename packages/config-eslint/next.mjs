// @ts-check
import { createESLintConfig } from './base.mjs'
import { nextCoreWebVitals } from './lib/next-core-web-vitals.mjs'

/**
 * ESLint config for Next.js projects.
 * @param {import('typescript-eslint').ConfigWithExtends[]} userConfig
 * @returns
 */
export const createESLintConfigNext = (...userConfig) =>
  createESLintConfig(
    {
      ignores: ['.next'],
    },
    ...nextCoreWebVitals,
    {
      rules: {
        '@next/next/no-img-element': 'off',
      },
    },
    {
      files: [
        '**/{page,layout,route,loading,not-found,opengraph-image}.{js,jsx,ts,tsx}',
        '**/*.stories.{js,jsx,ts,tsx}',
      ],
      rules: {
        'no-restricted-exports': 'off',
      },
    },
    ...userConfig,
  )
