import React from 'react'

import styles from '@/app/(home)/page.module.scss'

import Button from '@/components/atoms/Button'
import { OpenInNewTab } from '@/components/atoms/OpenInNewTab'

import Utils from '@/lib/utils'

import { MutualLinkRecord } from './loader'

export function MutualLinkBlock(props: { record: MutualLinkRecord }) {
  const {
    record: { url, siteName, ownerName, twitterId, description },
  } = props

  // Shrink siteName if its length too long
  const style =
    Utils.calcMonospacedTextWidth(siteName) < 20
      ? {}
      : ({
          letterSpacing: -0.5,
        } as React.CSSProperties)

  return (
    <div className={styles.link_block}>
      <p style={{ textAlign: 'center' }}>
        <Button externalLink={true} href={url} style={style}>
          {siteName}
        </Button>
      </p>
      <p>
        <OpenInNewTab href={`https://twitter.com/${twitterId}/`}>
          <b>{ownerName}</b>
        </OpenInNewTab>
        さんのHP
      </p>
      <p>{description}</p>
    </div>
  )
}
