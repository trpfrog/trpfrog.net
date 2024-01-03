import { ComponentPropsWithRef } from 'react'

import { tv } from 'tailwind-variants'

import { plainBlockStyle } from '@/components/atoms/PlainBlock'
import { A } from '@/components/wrappers'
import { AProps } from '@/components/wrappers/A'

const styles = {
  base: tv({
    extend: plainBlockStyle,
    base: [
      'tw-relative tw-block tw-h-full tw-w-full',
      'tw-rounded-xl tw-border-2 tw-border-window-color',
    ],
  }),

  h2: tv({
    base: [
      'tw-absolute tw-right-0 tw-top-0 tw-z-10 tw-rounded-es-lg',
      'tw-bg-window-color tw-px-2 tw-pb-1 tw-font-bold tw-italic',
    ],
  }),

  readMore: tv({
    base: [
      'tw-absolute tw-bottom-0 tw-right-0 tw-z-10 tw-rounded-ss-lg tw-px-2',
      'tw-translate-x-0.5 -tw-skew-x-12 tw-bg-window-color tw-text-base',
      'tw-font-bold tw-text-text-color',
    ],
  }),
}

export interface TopCardProps extends ComponentPropsWithRef<'div'> {
  title?: string
}

export function TopCard(props: TopCardProps) {
  const { className, children, title, ...rest } = props
  return (
    <div className={styles.base({ className })} {...rest}>
      {title && <h2 className={styles.h2()}>{title}</h2>}
      {children}
    </div>
  )
}

export interface TopLinkCardProps extends AProps {
  title?: string
  readMoreText?: string | boolean
}

export function LinkTopCard(props: TopLinkCardProps) {
  const { className, children, title, readMoreText, ...rest } = props
  const showReadMore = readMoreText !== false
  const readMore = typeof readMoreText === 'string' ? readMoreText : '→'

  return (
    <A className={styles.base({ className, clickable: true })} {...rest}>
      {title && <h2 className={styles.h2()}>{title}</h2>}
      {children}
      {showReadMore && <div className={styles.readMore()}>{readMore}</div>}
    </A>
  )
}
