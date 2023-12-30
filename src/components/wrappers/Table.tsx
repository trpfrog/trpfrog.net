import * as React from 'react'

import { tv } from 'tailwind-variants'

interface Props extends React.ComponentPropsWithRef<'table'> {}

const style = tv({
  base: [
    // border-radius (角丸にするために clip する)
    'tw-overflow-clip tw-rounded-lg',
    // border
    'tw-border-2', // table に border を指定すると内側の border が打ち消される？
    '[&_th]:tw-border-2 [&_th]:tw-border-window-color',
    '[&_td]:tw-border-2 [&_td]:tw-border-window-color',

    '[&_th]:tw-px-2 [&_th]:tw-py-1 [&_th]:tw-font-bold',
    '[&_td]:tw-px-2 [&_td]:tw-py-1',
    '[&_td]:tw-bg-trpfrog-50 [&_th]:tw-bg-trpfrog-200',
  ],
})

export const Table = React.forwardRef<HTMLTableElement, Props>(
  function Table(props, ref) {
    const { className, ...rest } = props

    return <table ref={ref} className={style({ className })} {...rest} />
  },
)
