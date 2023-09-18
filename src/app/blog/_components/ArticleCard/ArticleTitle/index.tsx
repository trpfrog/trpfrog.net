import React from 'react'

import Balancer from 'react-wrap-balancer'

import { ParseWithBudouX } from '@/lib/wordSplit'

import styles from './index.module.scss'

type Props = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  title: string
  isHero?: boolean
}

export default function ArticleTitle(props: Props) {
  const { title, className, isHero, ...rest } = props
  return (
    <div
      className={`${styles.wrapper} ${className}`}
      {...rest}
      data-hero-article={!!isHero}
    >
      <h3 data-hero-article={!!isHero} className={styles.title}>
        <Balancer>
          <ParseWithBudouX str={title} slug={`${props.key ?? title}`} />
        </Balancer>
      </h3>
    </div>
  )
}
