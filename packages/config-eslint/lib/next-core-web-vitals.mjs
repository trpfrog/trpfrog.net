// @ts-check
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import { fixupPluginRules } from '@eslint/compat'

const namePrefix = '@trpfrog.net/config-eslint/next-core-web-vitals'

// https://github.com/vercel/next.js/discussions/49337#discussioncomment-6009130
export const nextCoreWebVitals = tseslint.config({
  name: namePrefix,
  files: ['**/*.ts', '**/*.tsx'],
  plugins: {
    react: reactPlugin,
    // @ts-expect-error
    'react-hooks': fixupPluginRules(hooksPlugin),
    '@next/next': nextPlugin,
  },
  // @ts-ignore
  rules: {
    ...reactPlugin.configs['jsx-runtime'].rules,
    ...hooksPlugin.configs.recommended.rules,
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
    '@next/next/no-img-element': 'error',

    // These rule are not compatible with eslint v9
    // TODO: Remove this rule when eslint v9 is supported
    '@next/next/no-duplicate-head': 'off',
    '@next/next/no-page-custom-font': 'off',
  },
})
