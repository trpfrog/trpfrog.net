import * as React from 'react'

import Skeleton from 'react-loading-skeleton'

import { createHostnameStyles } from '@/components/organisms/LinkCard/Hostname'
import { createLinkCardStyles } from '@/components/organisms/LinkCard/LinkCard'
import { A } from '@/components/wrappers'

import type { Except } from 'type-fest'

type LinkCardProps = Except<React.ComponentPropsWithoutRef<'a'>, 'children'>

export function SkeletonLinkCard(props: LinkCardProps) {
  const styles = createLinkCardStyles()
  const hostnameStyles = createHostnameStyles()

  const { className, ...rest } = props
  return (
    <A className={styles.wrapper({ className })} {...rest}>
      <div className={styles.layout()}>
        <div className={styles.textArea()} style={{ width: '70% ' }}>
          <Skeleton className={hostnameStyles.wrapper()} style={{ width: '50%' }} />
          <div className={styles.titles()}>
            <div className={styles.title()}>
              <Skeleton />
            </div>
            <div className={styles.description()}>
              <Skeleton count={2} style={{ width: '100%' }} />
            </div>
          </div>
        </div>
        <div className={styles.image()}>
          <Skeleton style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </A>
  )
}
