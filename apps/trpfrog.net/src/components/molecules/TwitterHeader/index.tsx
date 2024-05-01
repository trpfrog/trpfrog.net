import * as React from 'react'

import { faDove } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createURL } from '@trpfrog.net/utils'

import { TwitterIcon } from '@/components/atoms/twitter/TwitterIcon'
import { iconPreset } from '@/components/atoms/twitter/TwitterIcon/preset'
import { BlockLink } from '@/components/molecules/BlockLink'
import { A } from '@/components/wrappers'

import styles from './index.module.scss'

export type TwitterHeaderProps = {
  iconStyle?: React.CSSProperties['background']
  preset?: keyof typeof iconPreset
  name: string
  screenName: string
}

export function TwitterHeader(props: TwitterHeaderProps) {
  const userLink = createURL(props.screenName, 'https://twitter.com/')
  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <BlockLink href={userLink}>
          <TwitterIcon
            iconStyle={props.iconStyle}
            preset={props.preset ?? props.screenName.toLowerCase()}
          />
        </BlockLink>
        <div className={styles.name_box}>
          <A openInNewTab href={userLink}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.userid}>@{props.screenName}</div>
          </A>
        </div>
      </div>
      <div className={styles.logo}>
        <FontAwesomeIcon icon={faDove} style={{ fontSize: '1.5em' }} />
      </div>
    </div>
  )
}
