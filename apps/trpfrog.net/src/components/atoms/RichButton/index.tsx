import * as React from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

type Props<T extends React.ElementType> = {
  as: T
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'disabled'>

export function RichButton<T extends React.ElementType>(props: Props<T>) {
  const { as, className, ...rest } = props
  const Wrapper = props.as as React.ElementType
  return (
    <Wrapper
      {...rest}
      className={classNames(
        styles.button,
        (props.disabled || props['aria-disabled']) && styles.disabled,
        className,
      )}
    />
  )
}
