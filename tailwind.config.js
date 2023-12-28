/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        sp: { max: '999px' },
        pc: { min: '1000px' },
      },
    },
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
    },
  },
  plugins: [],
  prefix: 'tw-',
}
