import { ComponentPropsWithRef } from 'react'

import { plainBlockStyle } from '@/components/atoms/PlainBlock'
import { A } from '@/components/wrappers'
import { AProps } from '@/components/wrappers/A'

import { tv, VariantProps } from '@/lib/tailwind/variants'

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
      'tw-absolute tw-z-10 tw-px-2 tw-pb-0.5',
      'tw-bg-window-color tw-text-sm tw-font-bold tw-italic tw-leading-tight',
    ],
    variants: {
      position: {
        'top-right': 'tw-right-0 tw-top-0 tw-rounded-es-lg',
        'top-left': 'tw-left-0 tw-top-0 tw-rounded-ee-lg',
      },
    },
  }),

  readMore: tv({
    base: [
      'tw-absolute tw-bottom-0 tw-right-0 tw-z-10 tw-rounded-ss-lg tw-px-2',
      'tw-translate-x-0.5 -tw-skew-x-12 tw-bg-window-color tw-text-base',
      'tw-font-bold tw-text-text-color',
    ],
  }),
}

interface TopCardProps extends ComponentPropsWithRef<'div'> {
  title?: string
  titlePosition?: VariantProps<typeof styles.h2>['position']
}

export function TopCard(props: TopCardProps) {
  const { className, children, title, titlePosition = 'top-left', ...rest } = props
  return (
    <div className={styles.base({ className })} {...rest}>
      {title && (
        <h2
          className={styles.h2({
            position: titlePosition,
          })}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  )
}

interface TopLinkCardProps extends AProps {
  title?: string
  readMoreText?: string | boolean
  titlePosition?: VariantProps<typeof styles.h2>['position']
}

export function LinkTopCard(props: TopLinkCardProps) {
  const { className, children, title, readMoreText, titlePosition = 'top-left', ...rest } = props
  const showReadMore = readMoreText !== false
  const readMore = typeof readMoreText === 'string' ? readMoreText : '→'

  return (
    <A className={styles.base({ className, clickable: true })} openInNewTab={false} {...rest}>
      {title && (
        <h2
          className={styles.h2({
            position: titlePosition,
          })}
        >
          {title}
        </h2>
      )}
      {children}
      {showReadMore && <div className={styles.readMore()}>{readMore}</div>}
    </A>
  )
}
