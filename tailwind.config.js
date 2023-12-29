const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        trpfrog: {
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
      },
      borderWidth: {
        1: '1px',
      },
    },
    screens: {
      sp: { max: '999px' },
      pc: { min: '1000px' },
    },
    fontFamily: {
      'mplus-rounded': [
        'var(--font-m-plus-rounded-1c)',
        ...defaultTheme.fontFamily.sans,
      ],
    },
  },
  plugins: [],
  prefix: 'tw-',
}
