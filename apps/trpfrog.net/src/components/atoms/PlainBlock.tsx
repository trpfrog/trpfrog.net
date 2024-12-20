import * as React from 'react'

import { tv } from '@/lib/tailwind/variants'

export const plainBlockStyle = tv({
  base: [
    'tw-bg-window-color',
    'tw-shadow-trpfrog-400 dark:tw-shadow-trpfrog-900',
    'tw-overflow-clip tw-rounded-[--window-border-radius]',
    'print:tw-border-2 print:tw-border-black print:tw-shadow-gray-400',
    'focus-visible:tw-ring-8',
  ],
  variants: {
    clickable: {
      true: [
        'tw-cursor-pointer hover:-tw-translate-y-1 active:tw-translate-y-[3px] active:tw-shadow-none',
        'hover:tw-shadow-[0_8px_0] hover:tw-shadow-trpfrog-400 hover:dark:tw-shadow-trpfrog-900',
      ],
    },
  },
  defaultVariants: {
    clickable: false,
  },
})

type PlainBlockProps = React.ComponentPropsWithRef<'div'>

export function PlainBlock(props: PlainBlockProps) {
  const { className, ref, ...rest } = props
  return <div ref={ref} className={plainBlockStyle({ className })} {...rest} />
}
