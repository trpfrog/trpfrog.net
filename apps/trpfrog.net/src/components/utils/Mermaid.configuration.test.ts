import mermaid from 'mermaid'
import { describe, expect, it } from 'vite-plus/test'

describe('Mermaid classic layout compatibility', () => {
  it.each(['forest', 'dark'] as const)(
    'parses Japanese flowcharts with the %s theme',
    async theme => {
      mermaid.initialize({ startOnLoad: false, layout: 'dagre', look: 'classic', theme })
      expect(mermaid.mermaidAPI.getConfig()).toMatchObject({
        layout: 'dagre',
        look: 'classic',
        theme,
      })
      await expect(mermaid.parse('graph TD; A[日本語] --> B[確認]')).resolves.toMatchObject({
        diagramType: 'flowchart-v2',
      })
    },
  )
})
