// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import n from 'eslint-plugin-n'
import globals from 'globals'

const importPlugin = await import('eslint-plugin-import')

const namePrefix = '@trpfrog.net/config-eslint/base'

/**
 * ESLint config for TypeScript projects.
 * @param {import('typescript-eslint').ConfigWithExtends[]} userConfig
 */
export const createESLintConfig = (...userConfig) =>
  tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    {
      name: `${namePrefix}/ignores`,
      ignores: ['storybook-static', 'out', 'dist', 'build', 'coverage'],
    },
    {
      name: `${namePrefix}/import-rules`,
      plugins: {
        import: importPlugin,
        'unused-imports': unusedImports,
      },
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
      },
    },
    {
      name: `${namePrefix}/env-rules`,
      plugins: {
        n,
      },
      rules: {
        'n/no-process-env': 'error',
      },
    },
    {
      name: `${namePrefix}/restrict-default-exports`,
      files: ['**/*.{js,ts,mjs,cjs,jsx,tsx}'],
      ignores: ['*.config.{js,ts,mjs,cjs,jsx,tsx}', '.storybook/**/*'],
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
      name: `${namePrefix}/allow-underscore-for-unused-vars`,
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
    {
      name: `${namePrefix}/allow-process-env-for-config-files`,
      files: ['*.config.{js,ts,mjs,cjs,jsx,tsx}'],
      rules: {
        'n/no-process-env': 'off',
      },
      languageOptions: {
        globals: {
          ...globals.node,
        },
      },
    },
    ...userConfig,
    // @ts-ignore
    {
      name: 'prettier',
      ...prettier,
    },
  )
