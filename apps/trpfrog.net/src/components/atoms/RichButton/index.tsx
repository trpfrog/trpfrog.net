import * as React from 'react'

import { tv } from '@/lib/tailwind/variants'

import type { Except } from 'type-fest'

type Props<T extends React.ElementType> = {
  as: T
} & Except<React.ComponentPropsWithoutRef<T>, 'as'>

const style = tv({
  base: [
    'tw:inline-flex tw:justify-center tw:items-center',
    'tw:leading-none tw:py-3 tw:px-4 tw:rounded-full',
    'tw:cursor-pointer tw:transition',
    'tw:bg-(--link-button-color) tw:text-(--link-button-font-color)',
    'tw:shadow-[0_4px_0_var(--link-button-color-bottom)]',
    'tw:font-mplus-rounded tw:font-bold tw:text-center',
    'tw:no-underline tw:select-none',
    'tw:my-1', // ボタンの可動域分のマージン
  ],
  variants: {
    disabled: {
      true: [
        'tw:bg-gray-400',
        'tw:transform tw:translate-y-1 tw:shadow-none',
        'tw:pointer-events-none',
        'tw:cursor-default',
      ],
      false: [
        'tw:focus-visible:ring-4 tw:focus-visible:ring-inset tw:focus-visible:ring-trpfrog-600 tw:focus-visible:outline-hidden',
        'tw:pc:hover:-translate-y-0.5',
        'tw:pc:hover:shadow-[0_6px_0_var(--link-button-color-bottom)]',
        'tw:active:translate-y-1!',
        'tw:active:shadow-[0_0_0_var(--link-button-color-bottom)]!',
      ],
    },
  },
})

export function RichButton<T extends React.ElementType>(props: Props<T>) {
  const { as, className, ...rest } = props
  const Wrapper = props.as as React.ElementType
  return (
    <Wrapper
      {...rest}
      className={style({
        className,
        disabled: props.disabled || props['aria-disabled'],
      })}
    />
  )
}
