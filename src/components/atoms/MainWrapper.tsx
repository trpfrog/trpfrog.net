import * as React from 'react'
import { useMemo } from 'react'

import { tv } from 'tailwind-variants'

export const gridLayoutStyle = tv({
  base: [
    'sp:tw-grid-gap-[calc(var(--main-margin)*1.5)] tw-grid tw-grid-cols-1',
    'tw-gap-[var(--main-margin)]',
  ],
})

export const mainWrapperStyle = tv({
  base: [
    'tw-mx-auto tw-my-[var(--main-margin)]',
    'tw-w-[calc(100%-2*var(--main-margin))] tw-max-w-[1000px]',
  ],
  variants: {
    gridLayout: {
      true: gridLayoutStyle(),
    },
  },
  defaultVariants: {
    gridLayout: false,
  },
})

export interface MainWrapperProps
  extends React.ComponentPropsWithoutRef<'div'> {
  gridLayout?: boolean
}

export function MainWrapper(props: MainWrapperProps) {
  const { className, children, gridLayout, ...otherProps } = props
  const style = useMemo(
    () =>
      mainWrapperStyle({
        className,
        gridLayout,
      }),
    [className, gridLayout],
  )

  return (
    <div className={style} {...otherProps}>
      {children}
    </div>
  )
}
