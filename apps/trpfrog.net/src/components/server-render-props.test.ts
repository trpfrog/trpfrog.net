// @vitest-environment node
import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

const srcDir = path.resolve(import.meta.dirname, '..')

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === 'generated' ? [] : sourceFiles(full)
    return entry.name.endsWith('.tsx') && !entry.name.endsWith('.test.tsx') ? [full] : []
  })
}

// サーバーコンポーネントで作った要素を ui-sdk の render に渡すと、'use cache' 配下の SSR で
// 要素の型が失われてクライアント描画に落ちる。render を使うのはクライアントコンポーネントに限る。
describe('ui-sdk render props', () => {
  it('are only built inside client components', () => {
    const offenders = sourceFiles(srcDir).filter(file => {
      const source = fs.readFileSync(file, 'utf8')
      return /render=\{\s*</.test(source) && !/^['"]use client['"]/m.test(source)
    })
    expect(offenders.map(file => path.relative(srcDir, file))).toEqual([])
  })
})
