import * as React from 'react'

import { tv } from '@/lib/tailwind/variants'

type Props = React.ComponentPropsWithRef<'table'>

const style = tv({
  base: [
    // border-radius (角丸にするために clip する)
    'tw:overflow-clip tw:rounded-lg',
    // border
    'tw:border-2', // table に border を指定すると内側の border が打ち消される？
    'tw:[&_th]:border-2 tw:[&_th]:border-window-color',
    'tw:[&_td]:border-2 tw:[&_td]:border-window-color',

    'tw:[&_th]:px-2 tw:[&_th]:py-1 tw:[&_th]:font-bold',
    'tw:[&_td]:px-2 tw:[&_td]:py-1',
    'tw:[&_td]:bg-trpfrog-50 tw:[&_th]:bg-trpfrog-200',
    'tw:dark:[&_td]:bg-trpfrog-800 tw:dark:[&_th]:bg-trpfrog-700',
  ],
})

export function Table(props: Props) {
  const { className, ref, ...rest } = props
  return <table ref={ref} className={style({ className })} {...rest} />
}
