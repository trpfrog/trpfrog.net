import * as React from 'react'

import { tv } from 'tailwind-variants'

interface Props extends React.ComponentPropsWithRef<'hr'> {}

const style = tv({
  base: 'tw-my-8 tw-border-t-4 tw-border-dotted tw-border-t-body-color',
})

export const HorizontalRule = React.forwardRef<HTMLHRElement, Props>(
  function HorizontalRule(props, ref) {
    const { className, ...rest } = props
    return <hr className={style({ className })} ref={ref} {...rest} />
  },
)
