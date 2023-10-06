import React from 'react'

import styles from './index.module.scss'

type Props = React.ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode
}

export function ArticleGrid(props: Props) {
  const { className, ...rest } = props
  return <div className={`${styles.article_grid} ${className}`} {...rest} />
}
