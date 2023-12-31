import styles from '@/app/(home)/page.module.scss'

import { MagicButton } from '@/components/atoms/Button'
import { Block } from '@/components/molecules/Block'

import { H2 } from 'src/components/wrappers/H2'

import links from './links.json'

export type MyLinkRecord = {
  url: string
  siteName: string
  description: string
}

type Props = {
  id?: string
}

export async function Links({ id }: Props) {
  return (
    <Block title={'リンク集'} h2icon={'pumpkin'} id={styles.links}>
      <div className={styles.link_grid}>
        {(links as MyLinkRecord[]).map(({ url, siteName, description }) => (
          <div key={siteName} className={styles.link_block}>
            <p style={{ textAlign: 'center' }}>
              <MagicButton href={url}>{siteName}</MagicButton>
            </p>
            <p>{description}</p>
          </div>
        ))}
      </div>

      <H2 icon="hina">相互リンク</H2>
      <p>移動しました！</p>
      <p>
        <MagicButton href={'/links'}>相互リンク</MagicButton>
      </p>
    </Block>
  )
}
