import * as React from 'react'

import type { Except } from 'type-fest'

import { ParseWithBudouX } from '@/lib/wordSplit'

import styles from './index.module.css'

type Props = Except<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  title: string
  isHero?: boolean
}

export function ArticleTitle(props: Props) {
  const { title, className, isHero, ...rest } = props
  return (
    <div className={`${styles.wrapper} ${className}`} {...rest} data-hero-article={!!isHero}>
      <h3 data-hero-article={!!isHero} className={`${styles.title} tw:text-balance`}>
        <ParseWithBudouX str={title} />
      </h3>
    </div>
  )
}
