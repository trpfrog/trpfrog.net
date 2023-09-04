import { MutualLinkRecord } from './loader'
import Utils from '@/lib/utils'
import React from 'react'
import styles from '@/app/(home)/style.module.scss'
import Button from '@/components/atoms/Button'

export function MutualLinkBlock(props: {
  record: MutualLinkRecord
  key?: string
}) {
  const {
    record: { url, siteName, ownerName, twitterId, description },
    key,
  } = props

  // Shrink siteName if its length too long
  const style =
    Utils.calcMonospacedTextWidth(siteName) < 20
      ? {}
      : ({
          letterSpacing: -0.5,
        } as React.CSSProperties)

  return (
    <div key={key} className={styles.link_block}>
      <p style={{ textAlign: 'center' }}>
        <Button externalLink={true} href={url} style={style}>
          {siteName}
        </Button>
      </p>
      <p>
        <a
          href={`https://twitter.com/${twitterId}/`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <b>{ownerName}</b>
        </a>
        さんのHP
      </p>
      <p>{description}</p>
    </div>
  )
}
