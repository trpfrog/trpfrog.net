import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'
import { getGoogleFontsUrl } from '../src/components/GoogleFonts'
import * as fs from 'fs'

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
       path.resolve(
         __dirname,
         '../src/components/GoogleFonts/index.module.scss',
       ),
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
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../src'),
    ]
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    }

    return config
  },

  previewHead: (head: string) => `
    ${head}
    ${googleFontsLoaderHtml}
  `,

  staticDirs: ['../public'],
}
export default config
