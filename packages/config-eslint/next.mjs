// @ts-check
import { createESLintConfig } from './base.mjs'
import { nextCoreWebVitals } from './lib/next-core-web-vitals.mjs'

const namePrefix = '@trpfrog.net/config-eslint/next'

/**
 * ESLint config for Next.js projects.
 * @param {import('typescript-eslint').ConfigWithExtends[]} userConfig
 * @returns
 */
export const createESLintConfigNext = (...userConfig) =>
  createESLintConfig(
    {
      name: `${namePrefix}/ignores`,
      ignores: ['.next', 'next-env.d.ts'],
    },
    ...nextCoreWebVitals,
    {
      name: `${namePrefix}/overrides`,
      rules: {
        '@next/next/no-img-element': 'off',
      },
    },
    {
      name: `${namePrefix}/allow-default-export-for-nextjs-files`,
      files: [
        '**/{page,layout,route,loading,not-found,opengraph-image,proxy}.{js,jsx,ts,tsx}',
        '**/*.stories.{js,jsx,ts,tsx}',
      ],
      rules: {
        'no-restricted-exports': 'off',
      },
    },
    ...userConfig,
  )
