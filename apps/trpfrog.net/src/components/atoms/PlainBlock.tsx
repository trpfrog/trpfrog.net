import * as React from 'react'

import { tv } from '@/lib/tailwind'

export const plainBlockStyle = tv({
  base: [
    'tw:bg-window-color',
    'tw:shadow-trpfrog-400 tw:dark:shadow-trpfrog-900',
    'tw:overflow-clip tw:rounded-(--window-border-radius)',
    'tw:print:border-2 tw:print:border-black tw:print:shadow-gray-400',
    'tw:focus-visible:ring-8',
  ],
  variants: {
    clickable: {
      true: [
        'tw:cursor-pointer tw:hover:-translate-y-1 tw:active:translate-y-[3px] tw:active:shadow-none',
        'tw:hover:shadow-[0_8px_0] tw:hover:shadow-trpfrog-400 tw:dark:hover:shadow-trpfrog-900',
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
