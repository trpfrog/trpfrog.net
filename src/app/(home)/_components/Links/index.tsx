import styles from '@/app/(home)/page.module.scss'

import Button from '@/components/atoms/Button'
import H2 from '@/components/atoms/H2'
import Block from '@/components/molecules/Block'

import links from './links.json'

export type MyLinkRecord = {
  url: string
  siteName: string
  description: string
}

type Props = {
  id?: string
}

export default async function Links({ id }: Props) {
  return (
    <Block title={'リンク集'} h2icon={'pumpkin'} id={styles.links}>
      <div className={styles.link_grid}>
        {(links as MyLinkRecord[]).map(({ url, siteName, description }) => (
          <div key={siteName} className={styles.link_block}>
            <p style={{ textAlign: 'center' }}>
              <Button href={url}>{siteName}</Button>
            </p>
            <p>{description}</p>
          </div>
        ))}
      </div>

      <H2 icon="hina">相互リンク</H2>
      <p>移動しました！</p>
      <p>
        <Button href={'/links'}>相互リンク</Button>
      </p>
    </Block>
  )
}
