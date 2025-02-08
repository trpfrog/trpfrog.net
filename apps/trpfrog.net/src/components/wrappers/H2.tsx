import * as React from 'react'

import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as R from 'remeda'
import * as v from 'valibot'

import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind/variants'

const iconURLs = {
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

export const H2IconSchema = v.picklist(R.keys(iconURLs))
export type H2Icon = keyof typeof iconURLs

// Props 定義を統一して、どの組み合わせでも受け付けるようにする
export type H2Props = React.ComponentPropsWithRef<'h2'> & {
  icon?: H2Icon
  variant?: 'default' | 'blog'
  hidePermalink?: boolean
}

const createStyles = tv({
  slots: {
    h2: ['tw-font-mplus-rounded tw-text-2xl tw-font-extrabold', 'tw-my-3 tw-flex tw-items-center'],
    icon: 'tw-mr-2 tw-h-8',
    text: null,
    anchor: [
      'tw-absolute -tw-left-7 tw-top-0 tw-pr-2 tw-opacity-0 sp:tw-hidden',
      'peer-hover:tw-text-gray-300 peer-hover:tw-opacity-100',
      'hover:tw-text-body-color hover:tw-opacity-100',
    ],
  },
  variants: {
    variant: {
      default: null,
      blog: {
        h2: [
          'tw-relative tw-mt-10 tw-w-full',
          'tw-border-b-2 tw-border-solid tw-border-b-trpfrog-300',
        ],
        text: 'tw-peer tw-w-full',
      },
    },
  },
})

export function H2({
  icon,
  variant = 'default',
  hidePermalink = false,
  className,
  children,
  ...rest
}: H2Props) {
  const styles = createStyles({ variant })
  return (
    <h2 className={styles.h2({ className })} {...rest}>
      {icon && iconURLs[icon] && <img className={styles.icon()} src={iconURLs[icon]} alt="" />}
      <span className={styles.text()}>{children}</span>
      {!hidePermalink && rest.id && (
        <A href={'#' + rest.id} className={styles.anchor()}>
          <FontAwesomeIcon icon={faPaperclip} />
        </A>
      )}
    </h2>
  )
}
