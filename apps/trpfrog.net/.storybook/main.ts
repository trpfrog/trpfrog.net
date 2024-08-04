import * as fs from 'fs'
import * as path from 'path'

import { getGoogleFontsUrl } from '../src/components/head/GoogleFonts'

import type { StorybookConfig } from '@storybook/nextjs'

const googleFontsLoaderHtml = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin="anonymous"
  >
  <link href="${getGoogleFontsUrl()}" rel="stylesheet">
  <style>
     ${fs.readFileSync(
       path.resolve(__dirname, '../src/components/head/GoogleFonts/index.module.scss'),
       'utf8',
     )}
  </style>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      document.body.className += ' temp_google_font_variables'
    })
  </script>
`

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },

  // Support import alias
  webpackFinal: async config => {
    if (!config.resolve) {
      return config
    }
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../src')]
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    }

    return config
  },

  previewHead: (head: string) => `
    ${head}
    <meta name="robots" content="noindex" />
    ${googleFontsLoaderHtml}
  `,

  staticDirs: ['../public'],
}
export default config
