import * as React from 'react'

import { tv } from '@/lib/tailwind/variants'

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

const styles = tv({
  slots: {
    h2: ['tw-font-mplus-rounded tw-text-2xl tw-font-extrabold', 'tw-my-3 tw-flex tw-align-middle'],
    icon: 'tw-mr-2 tw-h-8 tw-align-baseline',
  },
})()

export function H2(props: Props) {
  const { icon, className, children, ref, ...rest } = props

  return (
    <h2 className={styles.h2({ className })} ref={ref} {...rest}>
      {icon && icon in iconURLs && <img className={styles.icon()} src={iconURLs[icon]} alt="" />}
      {children}
    </h2>
  )
}
