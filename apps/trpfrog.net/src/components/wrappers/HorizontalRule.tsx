import * as React from 'react'

import { tv } from '@/lib/tailwind/variants'

type Props = React.ComponentPropsWithRef<'hr'>

const style = tv({
  base: 'tw:my-8 tw:border-t-4 tw:border-dotted tw:border-t-body-color',
})

export function HorizontalRule(props: Props) {
  const { className, ref, ...rest } = props
  return <hr className={style({ className })} ref={ref} {...rest} />
}
