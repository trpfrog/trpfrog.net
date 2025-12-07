import * as React from 'react'

import { tv } from '@/lib/tailwind/variants'

type Props = React.ComponentPropsWithRef<'h3'>

const style = tv({
  base: [
    // layout
    'tw:mb-4 tw:mt-6 tw:block tw:w-fit tw:px-2',
    // background
    'tw:bg-linear-to-r tw:to-transparent',
    'tw:from-trpfrog-25 tw:dark:from-trpfrog-800',
    // text
    'tw:font-bold tw:leading-relaxed',
  ],
  variants: {
    type: {
      h3: 'tw:border-l-[6px] tw:border-l-trpfrog-500 tw:text-xl tw:dark:border-l-trpfrog-400',
      h4: 'tw:border-l-4 tw:border-l-trpfrog-300 tw:text-lg tw:dark:border-l-trpfrog-600',
      h5: 'tw:border-l-2 tw:border-l-trpfrog-200 tw:text-base tw:dark:border-l-trpfrog-700',
    },
  },
})

export function H3(props: Props) {
  const { className, ref, ...rest } = props
  return <h3 ref={ref} className={style({ className, type: 'h3' })} {...rest} />
}

export function H4(props: Props) {
  const { className, ref, ...rest } = props
  return <h4 ref={ref} className={style({ className, type: 'h4' })} {...rest} />
}

export function H5(props: Props) {
  const { className, ref, ...rest } = props
  return <h5 ref={ref} className={style({ className, type: 'h5' })} {...rest} />
}
