import React from 'react'

import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'

import styles from '@/components/organisms/LinkCard/LinkCard.module.scss'

export type LinkCardProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
>

export function SkeletonLinkCard(props: LinkCardProps) {
  const { className, ...rest } = props
  return (
    <div className={classNames(styles.main, className)} {...rest}>
      <div className={styles.textArea} style={{ width: '70% ' }}>
        <Skeleton className={styles.domainText} style={{ width: '50%' }} />
        <div className={styles.titleDescription}>
          <div className={styles.title}>
            <Skeleton />
          </div>
          <div className={styles.description}>
            <Skeleton count={2} style={{ width: '100%' }} />
          </div>
        </div>
      </div>
      <div className={styles.image} style={{ width: '30% ' }}>
        <Skeleton style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}
