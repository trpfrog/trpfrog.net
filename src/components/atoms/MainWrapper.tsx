import * as React from 'react'
import { useMemo } from 'react'

import { tv } from 'tailwind-variants'

const createStyles = tv({
  base: [
    'tw-mx-auto tw-my-[var(--main-margin)]',
    'tw-w-[calc(100%-2*var(--main-margin))] tw-max-w-[1000px]',
  ],
  variants: {
    grid: {
      true: {
        base: `
          sp:tw-grid-gap-[calc(var(--main-margin)*1.5)] tw-grid tw-grid-cols-1
          tw-gap-[var(--main-margin)]
        `,
      },
    },
  },
})

// TODO: grid の使用を任意にする
export function MainWrapper(props: React.ComponentPropsWithoutRef<'div'>) {
  const { className, children, ...otherProps } = props
  const style = useMemo(
    () =>
      createStyles({
        className,
        grid: !className?.split(' ').includes('tw-flex'),
      }),
    [className],
  )

  return (
    <div className={style} {...otherProps}>
      {children}
    </div>
  )
}
