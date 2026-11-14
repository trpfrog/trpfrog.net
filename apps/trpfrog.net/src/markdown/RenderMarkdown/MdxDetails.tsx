import * as React from 'react'

import { Details } from '@/components/atoms/Details'
import { twJoin } from '@/lib/tailwind'

export function MdxSummary(props: { children?: React.ReactNode }) {
  return <>{props.children}</>
}

function isSummary(
  node: React.ReactNode,
): node is React.ReactElement<{ children?: React.ReactNode }> {
  return React.isValidElement(node) && node.type === MdxSummary
}

/**
 * Markdown 中の `<details><summary>...</summary>...</details>` を Details で描画する。
 */
export function MdxDetails(props: {
  children?: React.ReactNode
  className?: string
  open?: boolean
}) {
  const items = React.Children.toArray(props.children)
  const summary = items.find(isSummary)
  return (
    <Details
      summary={summary?.props.children ?? '詳細'}
      defaultOpen={props.open}
      className={twJoin('tw:my-8', props.className)}
    >
      {items.filter(item => item !== summary)}
    </Details>
  )
}
