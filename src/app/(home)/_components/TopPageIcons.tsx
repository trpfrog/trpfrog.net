import Image from 'next/legacy/image'

import styles from '@/app/(home)/page.module.scss'

import { Block } from '@/components/molecules/Block'

import { MagicButton } from 'src/components/atoms/MagicButton'

type Props = {
  id?: string
}

export const TopPageIcons = ({ id }: Props) => {
  return (
    <Block title={'作ったアイコン'} h2icon={'evil'} id={id}>
      <div className={styles.top_icons}>
        {[0, 7, 5, 6]
          .map(i => i.toString())
          .map(i => (
            <Image
              key={i}
              src={'icons_gallery/' + i}
              width={100}
              height={100}
              layout={'responsive'}
              objectFit={'contain'}
              quality={15}
              alt={i + '番目のスタンプ画像'}
            />
          ))}
      </div>
      <MagicButton href={'/icons'}>もっと見る</MagicButton>
    </Block>
  )
}
