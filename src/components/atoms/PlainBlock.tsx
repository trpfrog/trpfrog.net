import * as React from 'react'

import { tv } from 'tailwind-variants'

export const plainBlockStyle = tv({
  base: [
    'tw-mb-[4px] tw-bg-window-color tw-shadow-[0_4px_0] tw-shadow-trpfrog-400',
    'tw-overflow-clip tw-rounded-3xl',
    'print:tw-border-2 print:tw-border-black print:tw-shadow-gray-400',
  ],
})

type Props = React.ComponentPropsWithRef<'div'>

export const PlainBlock = React.forwardRef<HTMLDivElement, Props>(
  function PlainBlock(props, ref) {
    const { className, ...rest } = props
    return (
      <div ref={ref} className={plainBlockStyle({ className })} {...rest} />
    )
  },
)
