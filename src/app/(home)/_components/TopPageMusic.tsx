'use client'

import { Button } from '@/components/atoms/Button'
import { Image } from '@/components/atoms/Image'
import { InlineLink } from '@/components/atoms/InlineLink'
import { Block } from '@/components/molecules/Block'
import { YouTube } from '@/components/organisms/YouTube'

type Props = {
  id?: string
}

export const TopPageMusic = ({ id }: Props) => {
  return (
    <Block title={'つまみのうた'} h2icon={'noa'} id={id}>
      <p>
        ねぎ一世(
        <InlineLink href="https://twitter.com/negiissei">@negiissei</InlineLink>
        )さんに「
        <b>つまみのうた</b>」を作っていただきました！(？？？？)
        ありがとうございます！！！
      </p>
      <YouTube videoId="h5C_yiBEAMg" />
      <p>
        Apple Music, Spotify, YouTube Music, LINE Music 他
        各種サイトで配信中！(なんで？)
      </p>
      <p>
        <Image
          src={'musicbanner'}
          width={500}
          height={100}
          alt={'つまみのうたのバナー'}
        />
      </p>
      <p style={{ display: 'flex', flexFlow: 'row wrap', gap: '8px 6px' }}>
        <Button externalLink={true} href="https://linkco.re/N4Z8hdvX">
          購入/ストリーミング
        </Button>
        <Button href={'/music'}>歌詞</Button>
      </p>
    </Block>
  )
}
