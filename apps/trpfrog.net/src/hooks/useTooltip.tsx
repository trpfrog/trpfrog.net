import { ComponentProps, useId } from 'react'

import { TooltipWrapper } from '@/components/utils/TooltipWrapper'

export function useTooltip() {
  const id = useId()
  const TooltipButton = (props: ComponentProps<'div'>) => <div {...props} data-tooltip-id={id} />
  const TooltipContent = (props: Omit<ComponentProps<typeof TooltipWrapper>, 'id'>) => (
    <TooltipWrapper {...props} id={id} />
  )
  return { TooltipButton, TooltipContent }
}
