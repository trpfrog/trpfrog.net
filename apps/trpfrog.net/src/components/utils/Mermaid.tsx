'use client'
import React, { useEffect, useId, useState } from 'react'

import { usePrefersColorScheme } from '@/hooks/usePrefersColorScheme'

import { PlainCodeBlock } from '../molecules/CodeBlock/PlainCodeBlock'

type MermaidProps = {
  chart: string
  className?: string
}

export function useMermaid(chart: string) {
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const id = 'mermaid-diagram' + useId().replaceAll(':', '')
  const colorScheme = usePrefersColorScheme()

  useEffect(() => {
    const renderDiagram = async () => {
      const { default: mermaid } = await import('mermaid')
      mermaid.initialize({
        startOnLoad: false,
        theme: colorScheme === 'dark' ? 'dark' : 'forest',
      })

      try {
        const { svg: renderedSvg } = await mermaid.render(id, chart)
        setSvg(renderedSvg)
        setError(null)
      } catch (error) {
        if (process.env.NODE_ENV === 'production' && error) {
          throw error
        }
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
      {svg ? (
        <div className={props.className} dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <p>Loading diagram...</p>
      )}
      {error && (
        <div className="tw:bg-red-700 tw:rounded tw:p-2">
          <div className="tw:text-lg tw:text-white tw:font-bold">
            Failed to render Mermaid diagram:
          </div>
          <PlainCodeBlock fileName="Mermaid Error">{error}</PlainCodeBlock>
        </div>
      )}
    </>
  )
}

export function StyledMermaid(props: MermaidProps) {
  return (
    <Mermaid
      {...props}
      className="tw-flex tw-justify-center tw-my-4 tw-p-2 tw-rounded-md tw-bg-zinc-50
        dark:tw-bg-zinc-800"
    />
  )
}
