'use client'
import React, { useEffect, useId, useState } from 'react'

import mermaid from 'mermaid'

import { usePrefersColorScheme } from '@/hooks/usePrefersColorScheme'

import { CodeBlock } from '../molecules/CodeBlock'

type MermaidProps = {
  chart: string
}

export function useMermaid(chart: string) {
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
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
        setError(null)
      } catch (error) {
        setError('' + error)
      }
    }

    renderDiagram().catch(console.error)
  }, [chart, id, colorScheme])

  return [svg, error]
}

export function Mermaid(props: MermaidProps) {
  const { chart } = props
  const [svg, error] = useMermaid(chart)
  return (
    <>
      {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <p>Loading diagram...</p>}
      {error && (
        <div className="tw-bg-red-700 tw-rounded tw-p-2">
          <div className="tw-text-lg tw-text-white tw-font-bold">
            Failed to render Mermaid diagram:
          </div>
          <CodeBlock language="text" fileName="Mermaid Error">
            {error}
          </CodeBlock>
        </div>
      )}
    </>
  )
}

export function StyledMermaid(props: MermaidProps) {
  return (
    <div className="tw-my-4 tw-p-2 tw-rounded-md tw-bg-zinc-50 dark:tw-bg-zinc-800">
      <Mermaid {...props} />
    </div>
  )
}
