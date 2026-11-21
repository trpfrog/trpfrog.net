import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import type { Preview } from '@storybook/nextjs-vite'
import { bypass, http } from 'msw'
import { mswLoader } from 'msw-storybook-addon/csf3'
import { setupWorker } from 'msw/browser'
import { sb } from 'storybook/test'
import { SWRConfig } from 'swr'

import { dark, light } from '@trpfrog.net/storybook-theme'

import { JotaiProvider } from '@/components/utils/JotaiProvider'
import { Toaster } from '@/components/utils/Toaster'
import { fontVariables } from '@/lib/googleFonts'

import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/variables.css'
import '@/app/globals.css'

// サーバーでしか動かないモジュールを __mocks__ の中身に差し替える
sb.mock(import('../src/app/blog/_components/EditButton.tsx'))
sb.mock(import('../src/app/ai-icons/actions.ts'))
sb.mock(import('../src/app/blog/rpc.ts'))

// app/layout.tsx の FixTooLargeFontAwesomeIcons と同じく、CSS は上で読み込んだものを使う
fontAwesomeConfig.autoAddCss = false

// next/font の CSS 変数は app/layout.tsx と同じく <html> のクラスで定義する
document.documentElement.classList.add(...fontVariables.split(' '))

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

// GitHub Pages では https://trpfrog.github.io/trpfrog.net/storybook/ のようにサブパスで配信する
const basePath = new URL('.', window.location.href).pathname

// コンポーネントは public のファイルを /images/... のような絶対パスで読む。ビルドしたものをサブパスで
// 配信しているときは、Storybook と一緒に置いたファイルへ振り替える。dev サーバーやテストでは振り替えない
const publicAssetHandlers =
  !import.meta.env.PROD || basePath === '/'
    ? []
    : ['images', 'favicons'].map(dir =>
        http.get(`${window.location.origin}/${dir}/*`, ({ request }) => {
          const url = new URL(request.url)
          return fetch(bypass(new URL(basePath + url.pathname.slice(1), url.origin)))
        }),
      )

async function startMockServiceWorker() {
  // setupWorker に渡したハンドラーは、ストーリーごとのハンドラーのリセット後も残る
  const worker = setupWorker(...publicAssetHandlers)
  await worker.start({
    // 既定の /mockServiceWorker.js ではサブパスで配信したときに見つからないので、相対 URL にする
    serviceWorker: { url: './mockServiceWorker.js' },
    quiet: true,
  })
  return worker
}

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      // next/navigation (App Router) のフックを使えるようにする
      appDirectory: true,
    },
    docs: {
      theme: prefersDark ? dark : light,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      options: {
        body: { name: 'body', value: 'var(--body-background)' },
        window: { name: 'window', value: 'var(--window-bkg-color)' },
        gray: { name: 'gray', value: '#f5f5f5' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'body' },
  },
  loaders: [mswLoader(startMockServiceWorker)],
  // ストーリーで変えたユーザー設定 (states/userSettings.ts) が他のストーリーに残らないようにする
  beforeEach() {
    return () => {
      for (const key of ['shouldFollowHeader', 'alwaysStickHeader', 'kawaii-logo']) {
        localStorage.removeItem(key)
      }
    }
  },
  decorators: [
    Story => (
      // SWR のキャッシュをストーリーごとに分け、前のストーリーで読んだデータを使い回さない
      <SWRConfig value={{ provider: () => new Map() }}>
        <JotaiProvider>
          <Toaster />
          <div className="tw:text-text-color">
            <Story />
          </div>
        </JotaiProvider>
      </SWRConfig>
    ),
  ],
}

export default preview
