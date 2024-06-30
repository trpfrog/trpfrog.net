import { themes } from '@storybook/theming'
import * as trpFrogTheme from '@trpfrog.net/storybook-theme'

import type { Preview } from '@storybook/react'

import '../src/styles/globals.scss'

const preview: Preview = {
  parameters: {
    darkMode: {
      // Override the default dark theme
      dark: { ...themes.dark, ...trpFrogTheme.dark },
      // Override the default light theme
      light: { ...themes.normal, ...trpFrogTheme.light },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'gray',
      values: [
        {
          name: 'body',
          value: 'var(--body-background)',
        },
        {
          name: 'window',
          value: 'var(--window-bkg-color)',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
  },
}

export default preview
