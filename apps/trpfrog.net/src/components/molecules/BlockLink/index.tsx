import * as React from 'react'

import Link, { LinkProps } from 'next/link'

import styles from './index.module.scss'

type Props = LinkProps & {
  className?: string
  style?: React.CSSProperties
  key?: React.Key
  id?: string
  children?: React.ReactNode
  openInNewTab?: boolean
}

export function BlockLink(props: Props) {
  const {
    className = '',
    id,
    key,
    children,
    openInNewTab,
    ...linkProps
  } = props
  return (
    <div className={`${styles.box} ${className}`} id={id} key={key}>
      {children}
      {openInNewTab ? (
        <Link
          {...linkProps}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        />
      ) : (
        <Link {...linkProps} className={styles.link} />
      )}
    </div>
  )
}
