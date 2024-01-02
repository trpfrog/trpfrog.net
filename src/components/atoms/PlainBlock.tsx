import * as React from 'react'

import { tv } from 'tailwind-variants'

export const plainBlockStyle = tv({
  base: [
    'tw-mb-[4px] tw-bg-window-color tw-shadow-[0_4px_0]',
    'tw-shadow-trpfrog-400 dark:tw-shadow-trpfrog-900',
    'tw-overflow-clip tw-rounded-3xl',
    'print:tw-border-2 print:tw-border-black print:tw-shadow-gray-400',
  ],
  variants: {
    clickable: {
      true: `
        tw-cursor-pointer hover:-tw-translate-y-1 hover:tw-shadow-[0_8px_0]
        hover:tw-shadow-trpfrog-400 active:tw-translate-y-[4px]
        active:tw-shadow-none hover:dark:tw-shadow-trpfrog-900
      `,
    },
  },
  defaultVariants: {
    clickable: false,
  },
})

export type PlainBlockProps = React.ComponentPropsWithRef<'div'>

export const PlainBlock = React.forwardRef<HTMLDivElement, PlainBlockProps>(
  function PlainBlock(props, ref) {
    const { className, ...rest } = props
    return (
      <div ref={ref} className={plainBlockStyle({ className })} {...rest} />
    )
  },
)
