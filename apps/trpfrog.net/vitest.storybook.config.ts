import path from 'node:path'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { defineConfig } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'

// ストーリーを実ブラウザで描画して play 関数を実行する。
// Playwright のブラウザが必要なので、`vp test` (Node で動く単体テスト) とは分けている
export default defineConfig({
  plugins: [storybookTest({ configDir: path.join(import.meta.dirname, '.storybook') })],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      // CopyButton のストーリーがクリップボードを読み書きする
      provider: playwright({
        contextOptions: { permissions: ['clipboard-read', 'clipboard-write'] },
      }),
      instances: [{ browser: 'chromium' }],
    },
  },
})
