import * as React from 'react'

import { tv } from 'tailwind-variants'

interface Props extends React.ComponentPropsWithRef<'h3'> {}

const style = tv({
  base: [
    // layout
    'tw-mb-4 tw-mt-6 tw-block tw-w-fit tw-px-2',
    // background
    'tw-bg-gradient-to-r tw-to-transparent',
    'tw-from-trpfrog-25 dark:tw-from-trpfrog-800',
    // text
    'tw-font-bold tw-leading-relaxed',
  ],
  variants: {
    type: {
      h3: 'tw-border-l-[6px] tw-border-l-trpfrog-500 tw-text-xl dark:tw-border-l-trpfrog-400',
      h4: 'tw-border-l-[4px] tw-border-l-trpfrog-300 tw-text-lg dark:tw-border-l-trpfrog-600',
      h5: 'tw-border-l-[2px] tw-border-l-trpfrog-200 tw-text-base dark:tw-border-l-trpfrog-700',
    },
  },
})

export const H3 = React.forwardRef<HTMLHeadingElement, Props>(
  function H3(props, ref) {
    const { className, ...rest } = props
    return (
      <h3 ref={ref} className={style({ className, type: 'h3' })} {...rest} />
    )
  },
)

export const H4 = React.forwardRef<HTMLHeadingElement, Props>(
  function H4(props, ref) {
    const { className, ...rest } = props
    return (
      <h4 ref={ref} className={style({ className, type: 'h4' })} {...rest} />
    )
  },
)

export const H5 = React.forwardRef<HTMLHeadingElement, Props>(
  function H5(props, ref) {
    const { className, ...rest } = props
    return (
      <h5 ref={ref} className={style({ className, type: 'h5' })} {...rest} />
    )
  },
)
