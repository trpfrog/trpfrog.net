import { ComponentProps, useId } from 'react'

import { TooltipWrapper } from '@/components/utils/TooltipWrapper'

import type { Except } from 'type-fest'

export function useTooltip() {
  const id = useId()
  const TooltipButton = (props: ComponentProps<'div'>) => <div {...props} data-tooltip-id={id} />
  const TooltipContent = (props: Except<ComponentProps<typeof TooltipWrapper>, 'id'>) => (
    <TooltipWrapper {...props} id={id} />
  )
  return { TooltipButton, TooltipContent }
}
