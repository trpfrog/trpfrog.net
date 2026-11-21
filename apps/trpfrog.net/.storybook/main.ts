import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
    '@storybook/addon-vitest',
    'msw-storybook-addon',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  // react-docgen-typescript は TypeScript 7 にない compiler API を使うため、Babel ベースの方で props を読む
  typescript: {
    reactDocgen: 'react-docgen',
  },
  // ./public には MSW の Service Worker を置く。サイトの public に置くと本番にも配信されてしまう
  staticDirs: ['../public', './public'],
  previewHead: head => `
    ${head}
    <meta name="robots" content="noindex" />
  `,
}

export default config
