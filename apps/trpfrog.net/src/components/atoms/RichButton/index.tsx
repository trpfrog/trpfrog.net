import * as React from 'react'

import { tv } from '@/lib/tailwind/variants'

type Props<T extends React.ElementType> = {
  as: T
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'disabled'>

const style = tv({
  base: [
    'tw-inline-flex tw-justify-center tw-items-center',
    'tw-leading-none tw-py-3 tw-px-4 tw-rounded-full',
    'tw-cursor-pointer tw-transition',
    'tw-bg-[--link-button-color] tw-text-[--link-button-font-color]',
    'tw-shadow-[0_4px_0_var(--link-button-color-bottom)]',
    'tw-font-mplus-rounded tw-font-bold tw-text-center',
    'tw-no-underline tw-select-none',
  ],
  variants: {
    disabled: {
      true: [
        'tw-bg-darkgray',
        'tw-transform tw-translate-y-0.5',
        'tw-pointer-events-none',
        'tw-cursor-default',
      ],
      false: [
        'focus-visible:tw-ring-4 focus-visible:tw-ring-inset focus-visible:tw-ring-trpfrog-600 focus-visible:tw-outline-none',
        'pc:hover:-tw-translate-y-0.5',
        'pc:hover:tw-shadow-[0_6px_0_var(--link-button-color-bottom)]',
        'active:!tw-translate-y-1',
        'active:!tw-shadow-[0_0_0_var(--link-button-color-bottom)]',
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
