import * as React from 'react'

import { tv } from 'tailwind-variants'

interface Props extends React.ComponentPropsWithRef<'h3'> {}

const style = tv({
  base: [
    // layout
    'tw-mb-4 tw-mt-6 tw-block tw-w-fit tw-px-2',
    // background
    'tw-bg-gradient-to-r tw-from-trpfrog-25 tw-to-transparent',
    // text
    'tw-font-bold tw-leading-relaxed',
  ],
  variants: {
    type: {
      h3: 'tw-border-l-[7px] tw-border-l-trpfrog-500 tw-text-xl',
      h4: 'tw-border-l-[5px] tw-border-l-trpfrog-300 tw-text-lg',
      h5: 'tw-border-l-[3px] tw-border-l-trpfrog-200 tw-text-base',
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
