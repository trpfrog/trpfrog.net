// @ts-check
import { createESLintConfigNext } from '@trpfrog.net/config-eslint'

export default createESLintConfigNext({
  name: 'trpfrog.net',
  rules: {
    '@next/next/no-img-element': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@/app/blog/*', '**/*.stories'],
        paths: [
          {
            name: 'tailwind-merge',
            message: 'Please import from @/lib/tailwind/merge instead.',
          },
          {
            name: 'tailwind-variants',
            message: 'Please import from @/lib/tailwind/variants instead.',
          },
        ],
      },
    ],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'object', 'index', 'type'],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: '{react,react-dom}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next**',
            group: 'external',
            position: 'before',
          },
          { pattern: '@/env/**', group: 'internal', position: 'before' },
          { pattern: '@/app/**', group: 'internal', position: 'before' },
          { pattern: '@/components/**', group: 'internal', position: 'before' },
          { pattern: '@/data/**', group: 'internal', position: 'before' },
          { pattern: '@/hooks/**', group: 'internal', position: 'before' },
          { pattern: '@/lib/**', group: 'internal', position: 'before' },
          { pattern: '@/styles/**', group: 'internal', position: 'before' },
          { pattern: '@blog/**', group: 'internal', position: 'before' },
        ],
      },
    ],
  },
})
