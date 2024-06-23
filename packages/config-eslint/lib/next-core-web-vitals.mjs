// @ts-check
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'

const namePrefix = '@trpfrog.net/config-eslint/next-core-web-vitals'

// https://github.com/vercel/next.js/discussions/49337#discussioncomment-6009130
export const nextCoreWebVitals = tseslint.config({
  name: namePrefix,
  files: ['**/*.ts', '**/*.tsx'],
  plugins: {
    react: reactPlugin,
    'react-hooks': hooksPlugin,
    '@next/next': nextPlugin,
  },
  // @ts-ignore
  rules: {
    ...reactPlugin.configs['jsx-runtime'].rules,
    ...hooksPlugin.configs.recommended.rules,
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
    '@next/next/no-img-element': 'error',
  },
})
