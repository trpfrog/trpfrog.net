import styles from '@/app/(home)/page.module.scss'

import { Image } from '@/components/atoms/Image'
import { Block } from '@/components/molecules/Block'

import { MagicButton } from 'src/components/atoms/MagicButton'

type Props = {
  id?: string
}

export const Store = ({ id }: Props) => {
  return (
    <Block title={'ストア'} h2icon={'otaku'} id={id}>
      <p>
        つまみさんのスタンプ・グッズ
        <br />
        好評発売中！
      </p>
      <div className={styles.link_grid}>
        <div className={styles.link_block}>
          <MagicButton
            externalLink={true}
            href="https://store.line.me/stickershop/product/4674940/ja"
          >
            LINEスタンプ vol.1
          </MagicButton>
        </div>
        <div className={styles.link_block}>
          <Image
            src={'/sticker_pr'}
            width={18}
            height={15}
            alt={'つまみグッズの画像'}
          />
          <MagicButton
            externalLink={true}
            href="https://store.line.me/stickershop/product/8879469/ja"
            style={{ marginTop: '10px' }}
          >
            LINEスタンプ vol.2
          </MagicButton>
        </div>
        <div className={styles.link_block}>
          <Image
            src={'/goods'}
            width={100}
            height={50}
            className="tw-bg-transparent tw-shadow-none"
            alt={'つまみグッズの画像'}
          />
          <MagicButton externalLink={true} href="https://suzuri.jp/TrpFrog">
            つまみグッズ on SUZURI
          </MagicButton>
        </div>
      </div>
    </Block>
  )
}
