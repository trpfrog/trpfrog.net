import * as React from 'react'

import { tv } from '@/lib/tailwind/variants'

export const plainBlockStyle = tv({
  base: [
    'tw-bg-window-color',
    'tw-shadow-trpfrog-400 dark:tw-shadow-trpfrog-900',
    'tw-overflow-clip tw-rounded-[--window-border-radius]',
    'print:tw-border-2 print:tw-border-black print:tw-shadow-gray-400',
  ],
  variants: {
    clickable: {
      true: `
        tw-cursor-pointer hover:-tw-translate-y-1 hover:tw-shadow-[0_8px_0]
        hover:tw-shadow-trpfrog-400 active:tw-translate-y-[3px]
        active:tw-shadow-none hover:dark:tw-shadow-trpfrog-900
      `,
    },
  },
  defaultVariants: {
    clickable: false,
  },
})

export type PlainBlockProps = React.ComponentPropsWithRef<'div'>

export function PlainBlock(props: PlainBlockProps) {
  const { className, ref, ...rest } = props
  return <div ref={ref} className={plainBlockStyle({ className })} {...rest} />
}
