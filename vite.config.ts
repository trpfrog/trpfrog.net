import { defineConfig } from 'vite-plus'

// `dist/` holds `vp pack` outputs and can keep files whose sources were deleted.
const noDistImports = {
  // Only our own packages: third-party imports like `katex/dist/*.css` are fine.
  regex: String.raw`^(\.{1,2}/|@trpfrog\.net/)(.*/)?dist(/|$)`,
  message: 'Import the package by its name instead of reaching into dist/.',
}

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
      denyWarnings: true,
      reportUnusedDisableDirectives: 'error',
    },
    jsPlugins: ['./packages/config-oxlint/plugin.ts'],
    plugins: [
      'eslint',
      'unicorn',
      'typescript',
      'node',
      'vitest',
      'import',
      'promise',
      'jsdoc',
      'oxc',
      'nextjs',
      'react',
      'react-perf',
      'jsx-a11y',
    ],
    ignorePatterns: ['out', 'dist', 'build', 'coverage', '.cloudflare', '.next', 'next-env.d.ts'],
    rules: {
      'eslint/no-restricted-imports': ['error', { patterns: [noDistImports] }],
      // React Compiler 系のうち、デフォルト (correctness) に含まれないもの。
      // react/todo は Compiler が未対応の構文を知らせるだけなので入れない
      'react/rules-of-hooks': 'error',
      'react/hooks': 'error',
      'react/capitalized-calls': 'error',
      'react/unsupported-syntax': 'error',
      'react/no-deriving-state-in-effects': 'error',
      'react/invariant': 'error',
      'react/syntax': 'error',
      'react/memo-dependencies': 'error',
      'react/exhaustive-effect-dependencies': 'error',
      // test.extend で作った it / test (フィクスチャ付き) もテストとして扱う
      'vitest/no-standalone-expect': ['error', { additionalTestBlockFunctions: ['it', 'test'] }],
      'eslint/no-unused-vars': [
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
      'node/no-process-env': [
        'error',
        {
          allowedVariables: ['NODE_ENV', 'PORT', 'PORTLESS_URL'],
        },
      ],
      'eslint/no-restricted-properties': [
        'error',
        {
          object: 'v',
          property: 'parse',
          message: "Use @trpfrog.net/utils's `validate` or `validateUnknown` instead.",
        },
        {
          object: 'v',
          property: 'safeParse',
          message: "Use @trpfrog.net/utils's `safeValidate` or `safeValidateUnknown` instead.",
        },
      ],
      'typescript/no-restricted-types': [
        'error',
        {
          types: {
            'v.InferInput': {
              message: "Use `@trpfrog.net/utils`'s `InferSchemaInput` instead.",
            },
            'v.InferOutput': {
              message: "Use `@trpfrog.net/utils`'s `InferSchemaOutput` instead.",
            },
          },
        },
      ],
      'trpfrog/require-disable-reason': 'error',
      'typescript/no-explicit-any': 'error',
      'typescript/no-non-null-assertion': 'error',
      'nextjs/no-img-element': 'off',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'ignore', propElementValues: 'ignore' },
      ],
    },
    overrides: [
      {
        files: ['**/*.{js,ts,mjs,cjs,jsx,tsx,mts,cts}'],
        rules: {
          'eslint/no-restricted-exports': [
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
        files: ['**/*.config.{mjs,cjs,js,jsx,ts,mts,cts,tsx}'],
        rules: {
          'eslint/no-restricted-exports': 'off',
          'node/no-process-env': 'off',
        },
        env: {
          node: true,
        },
      },
      {
        files: [
          '**/vitest.{mjs,cjs,js,jsx,ts,mts,cts,tsx}',
          '**/vitest.*.{mjs,cjs,js,jsx,ts,mts,cts,tsx}',
        ],
        rules: {
          'eslint/no-restricted-exports': 'off',
        },
      },
      {
        // Oxlint は JS プラグインを default export で読み込む
        files: ['packages/config-oxlint/plugin.ts'],
        rules: {
          'eslint/no-restricted-exports': 'off',
        },
      },
      {
        files: ['.storybook/**/*.{mjs,cjs,js,jsx,ts,mts,cts,tsx}'],
        rules: {
          'eslint/no-restricted-exports': 'off',
        },
      },
      {
        files: ['**/{page,layout,route,loading,not-found,opengraph-image,proxy}.{js,jsx,ts,tsx}'],
        rules: {
          'eslint/no-restricted-exports': 'off',
        },
      },
      {
        files: ['apps/trpfrog.net/**/*.{js,jsx,ts,tsx}'],
        rules: {
          'eslint/no-restricted-imports': [
            'error',
            {
              patterns: ['@/app/blog/*', noDistImports],
              paths: [
                {
                  name: '@trpfrog.net/posts/fs',
                  message:
                    '@trpfrog.net/posts/fs is for local filesystem access only. Use content-server or dev-blog-server routes from runtime code.',
                },
                {
                  name: 'tailwind-variants',
                  message: 'Please import from @/lib/tailwind instead.',
                },
              ],
            },
          ],
        },
      },
    ],
  },
  test: {
    projects: ['apps/*', 'packages/*'],
    globals: true,
    environment: 'happy-dom',
    isolate: true,
    clearMocks: true,
    restoreMocks: true,
    pool: 'threads',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'lcov', 'html'],
      reportOnFailure: true,
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
  fmt: {
    experimentalTailwindcss: {
      functions: ['tv', 'twMerge', 'twJoin'],
    },
    trailingComma: 'all',
    tabWidth: 2,
    semi: false,
    singleQuote: true,
    jsxSingleQuote: false,
    arrowParens: 'avoid',
    printWidth: 100,
    sortImports: {
      customGroups: [
        {
          groupName: 'react-libs',
          elementNamePattern: ['react', 'react-dom'],
        },
        {
          groupName: 'next-libs',
          elementNamePattern: ['next', 'next/**', '@next/**'],
        },
        {
          groupName: 'trpfrog-net-libs',
          elementNamePattern: ['@trpfrog.net/**'],
        },
      ],
      groups: [
        'builtin',
        'react-libs',
        'next-libs',
        'external',
        'trpfrog-net-libs',
        ['internal', 'subpath'],
        ['parent', 'sibling', 'index'],
        'style',
        'unknown',
      ],
      internalPattern: ['@/', '@blog/'],
      newlinesBetween: true,
    },
    ignorePatterns: [
      '**/node_modules',
      '**/.next',
      '**/*.md',
      '**/*.mdx',
      '**/*.json',
      '**/*.yaml',
      '**/*.yml',
      '**/.cloudflare',
    ],
  },
})
