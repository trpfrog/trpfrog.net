import { fn } from 'storybook/test'

import type * as original from '../rpc'

// rpc.ts は content-server からサーバー側で記事を取る ('use cache' を使う) ので、Storybook ではこれに差し替える。
// 返り値はストーリーごとに mocked(...) で決める
export const fetchPost = fn<typeof original.fetchPost>()
export const fetchPostList = fn<typeof original.fetchPostList>()
export const fetchSlugs = fn<typeof original.fetchSlugs>()
