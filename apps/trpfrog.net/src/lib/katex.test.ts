// @vitest-environment node

import katex from 'katex'
import { describe, expect, it } from 'vite-plus/test'

describe('KaTeX rendering compatibility', () => {
  it('renders inline math with accessible MathML and HTML', () => {
    const html = katex.renderToString('x^2 + y^2 = z^2')
    expect(html).toContain('class="katex"')
    expect(html).toContain('class="katex-mathml"')
    expect(html).toContain('class="katex-html"')
    expect(html).toContain('x^2 + y^2 = z^2')
    expect(html).not.toContain('class="katex-display"')
  })

  it('keeps display equations in a display wrapper', () => {
    const html = katex.renderToString('\\frac{1}{2}', { displayMode: true })
    expect(html).toContain('class="katex-display"')
    expect(html).toContain('<mfrac>')
  })

  it('reports invalid expressions instead of silently rendering them', () => {
    expect(() => katex.renderToString('\\notARealCommand')).toThrow(katex.ParseError)
    const html = katex.renderToString('\\notARealCommand', { throwOnError: false })
    expect(html).toContain('mathcolor="#cc0000"')
    expect(html).toContain('\\notARealCommand')
  })
})
