'use client'

import Image from 'next/legacy/image'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'

import Button from '@/components/atoms/Button'
import { Block } from '@/components/molecules/Block'

type Props = {
  id?: string
}

const TopPageMusic = ({ id }: Props) => {
  return (
    <Block title={'つまみのうた'} h2icon={'noa'} id={id}>
      <p>
        ねぎ一世(<a href="https://twitter.com/negiissei">@negiissei</a>)さんに「
        <b>つまみのうた</b>」を作っていただきました！(？？？？)
        ありがとうございます！！！
      </p>
      <div className="youtube-outer">
        <LiteYouTubeEmbed id="h5C_yiBEAMg" title="つまみのうた" />
      </div>
      <p>
        Apple Music, Spotify, YouTube Music, LINE Music 他
        各種サイトで配信中！(なんで？)
      </p>
      <p>
        <Image
          src={'musicbanner'}
          className={'rich_image'}
          width={'500'}
          height={'100'}
          layout={'responsive'}
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

export default TopPageMusic
