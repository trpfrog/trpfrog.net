'use client'

import { ComponentProps } from 'react'

import dynamic from 'next/dynamic'

const Tooltip = dynamic(() => import('react-tooltip').then(m => m.Tooltip))

export function TooltipWrapper(props: ComponentProps<typeof Tooltip>) {
  return <Tooltip {...props} />
}
