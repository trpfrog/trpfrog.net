import styles from './index.module.scss'
import React from 'react'

type Props = React.ComponentProps<'div'> & {
  children: React.ReactNode
}

export default function ArticleGrid(props: Props) {
  const { className, ...rest } = props
  return <div className={`${styles.article_grid} ${className}`} {...rest} />
}
