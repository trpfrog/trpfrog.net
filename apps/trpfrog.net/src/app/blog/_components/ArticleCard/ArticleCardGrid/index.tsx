import * as React from 'react'

import styles from './index.module.scss'

type Props = React.ComponentPropsWithoutRef<'div'> & {
  isHero?: boolean
}

export const gridArea = {
  title: 'title',
  tags: 'tags',
  thumbnail: 'thumbnail',
  info: 'info',
} as const

export function ArticleCardGrid(props: Props) {
  const { className, isHero, ...rest } = props
  return (
    <div
      className={`${styles.grid} ${className}`}
      {...rest}
      data-hero-article={!!isHero}
    />
  )
}
