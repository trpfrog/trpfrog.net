// .storybook/YourTheme.js

import { create } from '@storybook/theming/create'

export const light = create({
  base: 'light',
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'My custom Storybook',
  brandUrl: 'https://trpfrog.net',
  brandImage:
    'https://res.cloudinary.com/trpfrog/image/upload/storybook-logo.svg',
  brandTarget: '_self',

  //
  colorPrimary: '#66a928',
  colorSecondary: '#8cd34e',

  // UI
  appBg: '#fcfff1',
  appContentBg: '#fff9f2',
  appBorderColor: '#9cc535',
  appBorderRadius: 4,

  // Text colors
  textColor: '#10162F',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#ffffff',
  barSelectedColor: '#fff8e6',
  barBg: '#66a928',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#161f00',
  inputTextColor: '#131a00',
  inputBorderRadius: 8,
  booleanSelectedBg: '#c7e874',
})

export const dark = create({
  ...light,
  base: 'dark',

  appBorderColor: '#6e6500',

  textColor: light.textInverseColor,
  textInverseColor: light.textColor,

  appBg: '#393f1e',

  appContentBg: '#38271c',
  barBg: '#4f831f',

  inputBg: '#000000',
  inputTextColor: '#ffffff',

  booleanBg: '#000000',

  buttonBg: '#000000',
  booleanSelectedBg: '#4f831f',
})
