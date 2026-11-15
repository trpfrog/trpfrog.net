import * as React from 'react'

import {
  Tooltip as UITooltip,
  TooltipArrow,
  TooltipContent as UITooltipContent,
} from '@ui-sdk/react/tooltip'
import type { Except } from 'type-fest'

import { tv } from '@/lib/tailwind'

export { TooltipTrigger } from '@ui-sdk/react/tooltip'

// ホバーしたらすぐ開く。ui-sdk の既定では 600ms 待つ
export function Tooltip(props: React.ComponentProps<typeof UITooltip>) {
  return <UITooltip delay={0} {...props} />
}

const styles = tv({
  slots: {
    content: [
      'tw:z-50 tw:max-w-[min(20rem,90vw)] tw:rounded-sm tw:bg-[#222] tw:px-2 tw:py-1.5',
      'tw:text-sm tw:leading-tight tw:text-white',
      'tw:origin-(--transform-origin) tw:transition-[opacity,scale] tw:duration-150',
      'tw:data-starting-style:scale-95 tw:data-starting-style:opacity-0',
      'tw:data-ending-style:scale-95 tw:data-ending-style:opacity-0',
      'tw:data-instant:transition-none tw:motion-reduce:scale-100!',
    ],
    arrow: [
      'tw:size-2 tw:rotate-45 tw:bg-inherit',
      'tw:data-[side=top]:-bottom-1 tw:data-[side=bottom]:-top-1',
    ],
  },
})()

type TooltipContentProps = Except<
  React.ComponentProps<typeof UITooltipContent>,
  'className' | 'children'
> & {
  className?: string
  children?: React.ReactNode
}

export function TooltipContent(props: TooltipContentProps) {
  const { className, children, side = 'top', ...rest } = props
  return (
    <UITooltipContent
      side={side}
      sideOffset={8}
      className={styles.content({ className })}
      {...rest}
    >
      {children}
      <TooltipArrow className={styles.arrow()} />
    </UITooltipContent>
  )
}
