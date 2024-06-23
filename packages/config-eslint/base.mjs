// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import n from 'eslint-plugin-n'

const importPlugin = await import('eslint-plugin-import')

/**
 * ESLint config for TypeScript projects.
 * @param {import('typescript-eslint').ConfigWithExtends[]} userConfig
 */
export const createESLintConfig = (...userConfig) =>
  tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    {
      ignores: ['node_modules', 'storybook-static'],
    },
    {
      plugins: {
        import: importPlugin,
        'unused-imports': unusedImports,
        n,
      },
    },
    {
      rules: {
        'unused-imports/no-unused-imports': 'error',
        'import/order': [
          'warn',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'object',
              'index',
              'type',
            ],
            'newlines-between': 'always',
            pathGroupsExcludedImportTypes: ['builtin'],
            alphabetize: { order: 'asc', caseInsensitive: true },
            pathGroups: [
              {
                pattern: '{react,react-node}',
                group: 'external',
                position: 'before',
              },
            ],
          },
        ],
        'n/no-process-env': 'error',
      },
    },
    {
      ignores: ['*.config.{js,ts,mjs,cjs}'],
      rules: {
        'no-restricted-exports': [
          'error',
          {
            restrictDefaultExports: {
              direct: true,
              named: true,
              defaultFrom: true,
              namedFrom: true,
              namespaceFrom: true,
            },
          },
        ],
      },
    },
    {
      files: ['*.config.{js,ts,mjs,cjs}'],
      rules: {
        'n/no-process-env': 'off',
      },
    },
    ...userConfig,
    prettier, // prettier must be last
  )
