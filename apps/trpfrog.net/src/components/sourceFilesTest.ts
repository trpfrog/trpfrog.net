import fs from 'node:fs'
import path from 'node:path'

import { test } from 'vite-plus/test'

export interface SourceFile {
  /** src からの相対パス */
  name: string
  source: string
}

const srcDir = path.resolve(import.meta.dirname, '..')

function sourcePaths(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === 'generated' ? [] : sourcePaths(full)
    return entry.name.endsWith('.tsx') && !entry.name.endsWith('.test.tsx') ? [full] : []
  })
}

/** src 以下のコンポーネントのソース (.tsx) を、ファイルごとに一度だけ読んで渡す */
export const sourceFilesTest = test.extend('sourceFiles', { scope: 'file' }, () =>
  sourcePaths(srcDir).map((file): SourceFile => ({
    name: path.relative(srcDir, file),
    source: fs.readFileSync(file, 'utf8'),
  })),
)
