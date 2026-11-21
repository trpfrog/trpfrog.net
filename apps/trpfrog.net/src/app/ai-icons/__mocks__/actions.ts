import { fn } from 'storybook/test'

import type { fetchImageRecords as original } from '../actions'

// actions.ts はサーバーアクション (サーバーの環境変数を読む) なので、Storybook ではこれに差し替える。
// 返り値はストーリーごとに mocked(fetchImageRecords) で決める
export const fetchImageRecords = fn<typeof original>()
