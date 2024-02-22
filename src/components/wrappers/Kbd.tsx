import * as React from 'react'

import { tv } from 'tailwind-variants'

interface Props extends React.ComponentPropsWithRef<'kbd'> {}

const style = tv({
  base: [
    'tw-inline-block tw-min-w-6 tw-px-1 tw-align-text-top',
    'tw-rounded-md tw-border tw-border-gray-600 tw-bg-gray-800 tw-drop-shadow-sm',
    'tw-text-center tw-font-mono tw-text-[0.7em] tw-text-white',
  ],
})

export const Kbd = React.forwardRef<HTMLDivElement, Props>(
  function Kbd(props, ref) {
    const { className, ...rest } = props
    return <kbd className={style({ className })} ref={ref} {...rest} />
  },
)
