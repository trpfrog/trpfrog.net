import * as React from 'react'

import styles from './index.module.css'

export type DetailsProps = React.ComponentPropsWithoutRef<'details'> & {
  summary: string
  innerProps?: Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>
  onClick?: (event: React.MouseEvent<HTMLDetailsElement, MouseEvent>) => void
}

export function Details(props: DetailsProps) {
  const { className = '', children, summary, onClick, ...rest } = props
  return (
    <details className={`${styles.details} ${className}`} {...rest}>
      <summary onClick={onClick}>{summary}</summary>
      <div {...props.innerProps}>{children}</div>
    </details>
  )
}
