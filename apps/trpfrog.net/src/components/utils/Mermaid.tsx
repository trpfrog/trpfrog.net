'use client'
import React, { useEffect, useId, useState } from 'react'

import mermaid from 'mermaid'

import { usePrefersColorScheme } from '@/hooks/usePrefersColorScheme'

type MermaidProps = {
  chart: string
}

export function useMermaid(chart: string) {
  const [svg, setSvg] = useState<string | null>(null)
  const id = 'mermaid-diagram' + useId().replaceAll(':', '')
  const colorScheme = usePrefersColorScheme()

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: colorScheme === 'dark' ? 'dark' : 'forest',
    })

    const renderDiagram = async () => {
      try {
        const { svg: renderedSvg } = await mermaid.render(id, chart)
        setSvg(renderedSvg)
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error)
        setSvg('<p>Error rendering diagram. Check the syntax.</p>')
      }
    }

    renderDiagram().catch(console.error)
  }, [chart, id, colorScheme])

  return svg
}

export function Mermaid(props: MermaidProps) {
  const { chart } = props
  const svg = useMermaid(chart)
  return svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <p>Loading diagram...</p>
}

export function StyledMermaid(props: MermaidProps) {
  return (
    <div className="tw-my-4 tw-p-2 tw-rounded-md tw-bg-zinc-50 dark:tw-bg-zinc-800">
      <Mermaid {...props} />
    </div>
  )
}
