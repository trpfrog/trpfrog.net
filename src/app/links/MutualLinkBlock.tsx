import * as React from 'react'

import styles from '@/app/(home)/page.module.scss'

import { A } from '@/components/wrappers'

import { calcMonospacedTextWidth } from '@/lib/utils'

import { MagicButton } from 'src/components/atoms/MagicButton'

import { MutualLinkRecord } from './loader'

export function MutualLinkBlock(props: { record: MutualLinkRecord }) {
  const {
    record: { url, siteName, ownerName, twitterId, description },
  } = props

  // Shrink siteName if its length too long
  const style =
    calcMonospacedTextWidth(siteName) < 20
      ? {}
      : ({
          letterSpacing: -0.5,
        } as React.CSSProperties)

  return (
    <div className={styles.link_block}>
      <p style={{ textAlign: 'center' }}>
        <MagicButton externalLink={true} href={url} style={style}>
          {siteName}
        </MagicButton>
      </p>
      <p>
        <A href={`https://twitter.com/${twitterId}/`}>
          <b>{ownerName}</b>
        </A>
        さんのHP
      </p>
      <p>{description}</p>
    </div>
  )
}
