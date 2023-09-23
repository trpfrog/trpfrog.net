import React from 'react'

import styles from './index.module.scss'

export type DetailsProps = React.ComponentPropsWithoutRef<'details'> & {
  summary: string
  innerProps?: Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>
}

export function Details(props: DetailsProps) {
  const { className = '', children, summary, ...rest } = props
  return (
    <details className={`${styles.details} ${className}`} {...rest}>
      <summary>{summary}</summary>
      <div {...props.innerProps}>{children}</div>
    </details>
  )
}
