import containerQuery from '@tailwindcss/container-queries'

import type { Config } from 'tailwindcss'
import type { Except } from 'type-fest'

// We want each package to be responsible for its own content.
const config: Except<Config, 'content'> = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        trpfrog: {
          25: '#f5ffe6',
          50: '#e5f8c0',
          100: '#c7e876',
          200: '#b2d558',
          300: '#9ACC29',
          400: '#8DBA20',
          500: '#6EA101',
          600: '#617F17',
          700: '#456401',
          800: '#2A390A',
          900: '#32342A',
        },
        'body-color': 'rgb(var(--color-body))',
        'text-color': 'rgb(var(--color-text))',
        'window-color': 'rgb(var(--color-window))',
        'header-color': 'rgb(var(--color-header))',
      },
      borderWidth: {
        1: '1px',
      },
      height: {
        header: 'var(--header-height)',
      },
    },
    screens: {
      sp: { max: '799px' },
      pc: { min: '800px' },
      wide: { min: '1000px' },
    },
  },
  plugins: [containerQuery],
  prefix: 'tw-',
}

export default config
