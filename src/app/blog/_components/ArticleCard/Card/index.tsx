import React from 'react'

import styles from './index.module.scss'

type Props = React.ComponentProps<'div'> & {
  isHero?: boolean
}

export default function Card(props: Props) {
  const { className, isHero, children, ...rest } = props
  return (
    <div
      className={`${styles.window} ${className}`}
      {...rest}
      data-hero-article={!!isHero}
    >
      {children}
    </div>
  )
}
