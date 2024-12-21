'use client'
import React, { useEffect, useId, useState } from 'react'

import mermaid from 'mermaid'

type MermaidProps = {
  chart: string
}

export function Mermaid(props: MermaidProps) {
  const { chart } = props
  const [svg, setSvg] = useState<string | null>(null) // State for the rendered SVG
  const id = 'mermaid-diagram' + useId().replaceAll(':', '')

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: false,
    })

    // Generate diagram
    const renderDiagram = async () => {
      try {
        const { svg: renderedSvg } = await mermaid.render(id, chart)
        setSvg(renderedSvg)
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error)
        setSvg('<p>Error rendering diagram. Check the syntax.</p>') // Store error message as fallback
      }
    }

    renderDiagram().catch(console.error)
  }, [id, chart])

  return svg ? (
    <div
      // key={chart}
      dangerouslySetInnerHTML={{
        __html: svg,
      }}
    />
  ) : (
    <p>Loading diagram...</p>
  )
}

export function StyledMermaid(props: MermaidProps) {
  return (
    <div className="tw-my-4 tw-p-2 tw-rounded-md tw-bg-gray-50 dark:tw-bg-gray-800">
      <Mermaid {...props} />
    </div>
  )
}
