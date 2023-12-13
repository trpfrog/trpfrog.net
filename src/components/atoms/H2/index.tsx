import * as React from 'react'

import styles from './index.module.scss'

export const iconURLs = {
  trpfrog: '/images/icons/trpfrog.webp',
  ice: '/images/icons/ice.webp',
  think: '/images/icons/thinking.webp',
  noa: '/images/icons/noa.webp',
  pumpkin: '/images/icons/pumpkin.webp',
  car: '/images/icons/car.webp',
  evil: '/images/icons/evil.webp',
  heart: '/images/icons/heart.webp',
  robot: '/images/icons/robot.webp',
  otaku: '/images/icons/otaku.webp',
  shark: '/images/icons/shark.webp',
  locked: '/images/icons/locked.webp',
  hina: '/images/icons/hina.webp',
} as const

export type H2Icon = keyof typeof iconURLs

type Props = React.ComponentPropsWithRef<'h2'> & {
  icon?: H2Icon
}

export const H2 = React.forwardRef<HTMLHeadingElement, Props>(
  function H2(props, ref) {
    const { icon, className = '', children, ...rest } = props

    return (
      <h2 className={`${styles.h2} ${className}`} ref={ref} {...rest}>
        {icon && <img className={styles.icon} src={iconURLs[icon]} alt="" />}
        {children}
      </h2>
    )
  },
)
