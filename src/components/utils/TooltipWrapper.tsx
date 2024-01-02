'use client'

import { ComponentProps } from 'react'

import { Tooltip } from 'react-tooltip'

export function TooltipWrapper(props: ComponentProps<typeof Tooltip>) {
  return <Tooltip {...props} />
}
