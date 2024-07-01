import * as React from 'react'

import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { PlainBlock } from '@/components/atoms/PlainBlock'
import { ServerLinkCard } from '@/components/organisms/LinkCard/ServerLinkCard'
import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind/variants'

import { MutualLinkRecord } from './loader'

const styles = tv({
  slots: {
    card: 'tw-rounded-lg tw-p-4',
    h3Wrapper: 'tw-mb-2 tw-flex tw-justify-between',
    h3: 'tw-text-lg tw-font-bold',
    social: 'tw-flex tw-gap-2',
    twitter: 'tw-text-xl tw-text-[#1DA1F2] hover:tw-brightness-125',
    github: 'tw-text-xl tw-text-[#333] hover:tw-text-gray-400',
  },
})()

export async function MutualLinkBlock(props: { record: MutualLinkRecord }) {
  const {
    record: { url, ownerName, twitter, github },
  } = props

  return (
    <PlainBlock className={styles.card()}>
      <div className={styles.h3Wrapper()}>
        <h3 className={styles.h3()}>{ownerName} さんのHP</h3>
        <div className={styles.social()}>
          {github && (
            <A href={`https://github.com/${github}`} className={styles.github()}>
              <FontAwesomeIcon icon={faGithub} />
            </A>
          )}
          {twitter && (
            <A href={`https://twitter.com/${twitter}`} className={styles.twitter()}>
              <FontAwesomeIcon icon={faTwitter} />
            </A>
          )}
        </div>
      </div>
      <ServerLinkCard href={url} />
    </PlainBlock>
  )
}
