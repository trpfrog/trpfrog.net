import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  test: {
    projects: ['apps/*', 'packages/*'],
    globals: true,
    environment: 'happy-dom',
    isolate: true,
    clearMocks: true,
    restoreMocks: true,
    pool: 'threads',
    fileParallelism: false,
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
      '**/.wrangler',
    ],
  },
})
