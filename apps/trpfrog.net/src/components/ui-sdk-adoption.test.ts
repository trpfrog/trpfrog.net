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

const files = sourceFiles(srcDir).map(file => ({
  name: path.relative(srcDir, file),
  // コメントは対象外にする
  source: fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ''),
}))

// 操作できる UI は ui-sdk の部品 (またはそれを使ったラッパー) で作る
describe('ui-sdk adoption', () => {
  it('uses no hand-written native controls', () => {
    const nativeControl =
      /<(button|input|select|textarea|details|summary|dialog|label|option)[\s>/]/
    const offenders = files.filter(f => nativeControl.test(f.source)).map(f => f.name)
    expect(offenders).toEqual([])
  })

  it('renders forms only through ui-sdk parts', () => {
    const offenders = files
      .filter(f =>
        [...f.source.matchAll(/<form\b/g)].some(
          m => !/render=\{\s*$/.test(f.source.slice(0, m.index)),
        ),
      )
      .map(f => f.name)
    expect(offenders).toEqual([])
  })

  it('hand-writes no ARIA widget roles or tab stops', () => {
    const offenders = files.filter(f => /\brole=|\btabIndex=/.test(f.source)).map(f => f.name)
    expect(offenders).toEqual([])
  })

  it('attaches interaction handlers only to components, not native elements', () => {
    const handler =
      /\bon(Click|DoubleClick|KeyDown|KeyUp|KeyPress|Change|Input|MouseDown|MouseUp|PointerDown|PointerUp|Submit)=/g
    const offenders = files.flatMap(f =>
      [...f.source.matchAll(handler)]
        .map(m => {
          const owner = [...f.source.slice(0, m.index).matchAll(/<([A-Za-z][\w.]*)/g)].at(-1)?.[1]
          return { owner, inRender: /render=\{\s*<form[^>]*$/.test(f.source.slice(0, m.index)) }
        })
        .filter(({ owner, inRender }) => owner !== undefined && /^[a-z]/.test(owner) && !inRender)
        .map(({ owner }) => `${f.name} <${owner}>`),
    )
    expect(offenders).toEqual([])
  })
})
