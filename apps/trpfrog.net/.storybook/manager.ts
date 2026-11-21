import { addons } from 'storybook/manager-api'

import { dark, light } from '@trpfrog.net/storybook-theme'

// サイトと同じく OS の設定でライト・ダークを切り替える
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

addons.setConfig({
  theme: prefersDark ? dark : light,
})
