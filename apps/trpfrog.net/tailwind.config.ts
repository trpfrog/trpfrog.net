import sharedConfig from '@trpfrog.net/config-tailwind'
import * as defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [sharedConfig],
  theme: {
    fontFamily: {
      'mplus-rounded': ['var(--font-m-plus-rounded-1c)', ...defaultTheme.fontFamily.sans],
      'palanquin-dark': ['var(--font-palanquin-dark)', ...defaultTheme.fontFamily.sans],
      mono: ['var(--font-noto-sans-mono)', ...defaultTheme.fontFamily.mono],
      inter: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
    },
  },
}
