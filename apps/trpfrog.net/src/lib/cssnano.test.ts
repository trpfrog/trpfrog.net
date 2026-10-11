import cssnano from 'cssnano'
import postcss from 'postcss'
import { describe, expect, it } from 'vite-plus/test'

async function minify(source: string) {
  return (await postcss([cssnano()]).process(source, { from: undefined })).root
}

describe('production CSS compression', () => {
  it('keeps empty layer declarations that determine the cascade order', async () => {
    const root = await minify('@layer reset, base, utilities; @layer base {} .x {color:red}')
    const layers: string[] = []
    root.walkAtRules('layer', rule => {
      layers.push(rule.params)
    })
    expect(layers[0]?.split(',').map(layer => layer.trim())).toEqual(['reset', 'base', 'utilities'])
  })

  it('preserves declarations on either side of a nested rule', async () => {
    const root = await minify('.x { color:red; & { color:blue } color:green }')
    const colors: string[] = []
    root.walkDecls('color', declaration => {
      colors.push(declaration.value)
    })
    expect(colors).toEqual(['red', 'blue', 'green'])
  })

  it('keeps variable calculations and SVG data URLs usable', async () => {
    const source =
      '.x { width:calc(100% - var(--sidebar)); background-image:url("data:image/svg+xml,%3Csvg%3E%3C/svg%3E") }'
    const root = await minify(source)
    const values: Record<string, string> = {}
    root.walkDecls(declaration => {
      values[declaration.prop] = declaration.value
    })
    expect(values.width).toBe('calc(100% - var(--sidebar))')
    expect(values['background-image']).toContain('data:image/svg+xml')
    expect(values['background-image']).toContain('%3Csvg')
  })
})
