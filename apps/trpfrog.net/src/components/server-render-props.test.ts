// @vitest-environment node
import { describe, expect } from 'vite-plus/test'

import { sourceFilesTest as it } from './sourceFilesTest'

// サーバーコンポーネントで作った要素を ui-sdk の render に渡すと、'use cache' 配下の SSR で
// 要素の型が失われてクライアント描画に落ちる。render を使うのはクライアントコンポーネントに限る。
describe('ui-sdk render props', () => {
  it('are only built inside client components', ({ sourceFiles }) => {
    const offenders = sourceFiles
      .filter(f => /render=\{\s*</.test(f.source) && !/^['"]use client['"]/m.test(f.source))
      .map(f => f.name)
    expect(offenders).toEqual([])
  })
})
