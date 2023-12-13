import * as React from 'react'

import styles from './index.module.scss'

export function MainWrapper(props: React.ComponentPropsWithoutRef<'div'>) {
  const { className, children, ...otherProps } = props
  return (
    <div className={`${styles.main_wrapper} ${className}`} {...otherProps}>
      {children}
    </div>
  )
}
