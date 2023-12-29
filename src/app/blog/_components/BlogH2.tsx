import * as React from 'react'

import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tv } from 'tailwind-variants'

import { A } from '@/components/wrappers'
import { H2 } from '@/components/wrappers/H2'

const styles = tv({
  slots: {
    h2: 'tw-relative tw-w-full tw-border-b-1 tw-border-solid tw-border-b-gray-500',
    text: 'tw-peer tw-w-full',
    anchor: [
      'tw-absolute -tw-left-7 tw-top-0 tw-pr-2 tw-opacity-0 sp:tw-hidden',
      'peer-hover:tw-text-gray-300 peer-hover:tw-opacity-100',
      'hover:tw-text-body-color hover:tw-opacity-100',
    ],
  },
})()

export function BlogH2(props: React.ComponentPropsWithoutRef<'h2'>) {
  const { className, children, ...rest } = props
  return (
    <H2 className={styles.h2({ className })} {...rest}>
      <span className={styles.text()}>{children}</span>
      <A href={'#' + props.id} className={styles.anchor()}>
        <FontAwesomeIcon icon={faPaperclip} />
      </A>
    </H2>
  )
}
