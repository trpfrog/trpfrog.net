import * as React from 'react'

import { tv } from '@/lib/tailwind/variants'

type Props = React.ComponentPropsWithRef<'kbd'>

const style = tv({
  base: [
    'tw:inline-block tw:min-w-6 tw:px-1 tw:align-text-top',
    'tw:rounded-md tw:border tw:border-gray-600 tw:bg-gray-800 tw:drop-shadow-sm',
    'tw:text-center tw:font-mono tw:text-[0.7em] tw:text-white',
  ],
})

export function Kbd(props: Props) {
  const { className, ref, ...rest } = props
  return <kbd className={style({ className })} ref={ref} {...rest} />
}
