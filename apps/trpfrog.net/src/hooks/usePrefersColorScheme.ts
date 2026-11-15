import { createColorScheme } from '@ui-sdk/core'
import { usePreference } from '@ui-sdk/react/preferences'

// サイトにテーマの切り替えは無いので、ブラウザの設定 (prefers-color-scheme) にだけ従う
const colorScheme = createColorScheme()

export function usePrefersColorScheme(): 'light' | 'dark' {
  const { resolved } = usePreference(colorScheme)
  // サーバーとハイドレーション中はブラウザの設定が分からないので light として描画する
  return resolved === 'dark' ? 'dark' : 'light'
}
