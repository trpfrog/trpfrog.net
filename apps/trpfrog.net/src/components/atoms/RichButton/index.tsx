import * as React from 'react'

import { Button } from '@ui-sdk/react/button'
import type { Except } from 'type-fest'

import { tv } from '@/lib/tailwind'

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
    'tw:focus-visible:ring-4 tw:focus-visible:ring-inset tw:focus-visible:ring-trpfrog-600 tw:focus-visible:outline-hidden',
    'tw:pc:hover:-translate-y-0.5',
    'tw:pc:hover:shadow-[0_6px_0_var(--link-button-color-bottom)]',
    'tw:active:translate-y-1!',
    'tw:active:shadow-[0_0_0_var(--link-button-color-bottom)]!',
    'tw:data-disabled:bg-gray-400 tw:data-disabled:translate-y-1! tw:data-disabled:shadow-none!',
    'tw:data-disabled:pointer-events-none tw:data-disabled:cursor-default',
  ],
})

export type RichButtonProps = Except<React.ComponentProps<typeof Button>, 'className'> & {
  className?: string
}

/**
 * 押し込めるボタン。リンクにするときは `render={<Link href="..." />}` を渡す。
 */
export function RichButton(props: RichButtonProps) {
  const { className, ...rest } = props
  return <Button {...rest} className={style({ className })} />
}
