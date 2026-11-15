// @vitest-environment node
import { describe, expect } from 'vite-plus/test'

import { type SourceFile, sourceFilesTest } from './sourceFilesTest'

// コメントは対象外にする
const it = sourceFilesTest.extend('files', { scope: 'file' }, ({ sourceFiles }): SourceFile[] =>
  sourceFiles.map(f => ({
    ...f,
    source: f.source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ''),
  })),
)

// 操作できる UI は ui-sdk の部品 (またはそれを使ったラッパー) で作る
describe('ui-sdk adoption', () => {
  it('uses no hand-written native controls', ({ files }) => {
    const nativeControl =
      /<(button|input|select|textarea|details|summary|dialog|label|option)[\s>/]/
    const offenders = files.filter(f => nativeControl.test(f.source)).map(f => f.name)
    expect(offenders).toEqual([])
  })

  it('uses no native media controls', ({ files }) => {
    const offenders = files
      .filter(f => /<(video|audio)\b[^>]*\bcontrols\b/.test(f.source))
      .map(f => f.name)
    expect(offenders).toEqual([])
  })

  it('renders forms only through ui-sdk parts', ({ files }) => {
    const offenders = files
      .filter(f =>
        [...f.source.matchAll(/<form\b/g)].some(
          m => !/render=\{\s*$/.test(f.source.slice(0, m.index)),
        ),
      )
      .map(f => f.name)
    expect(offenders).toEqual([])
  })

  it('hand-writes no ARIA widget roles or tab stops', ({ files }) => {
    const offenders = files.filter(f => /\brole=|\btabIndex=/.test(f.source)).map(f => f.name)
    expect(offenders).toEqual([])
  })

  it('attaches interaction handlers only to components, not native elements', ({ files }) => {
    const handler =
      /\bon(Click|DoubleClick|KeyDown|KeyUp|KeyPress|Change|Input|MouseDown|MouseUp|MouseEnter|MouseLeave|PointerDown|PointerUp|PointerEnter|PointerLeave|TouchStart|TouchEnd|TouchCancel|Scroll|Wheel|Drag|DragStart|Drop|Submit)=/g
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
