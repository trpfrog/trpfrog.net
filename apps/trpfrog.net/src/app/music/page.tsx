import { RichButton } from 'src/components/atoms/RichButton'

import { Image } from '@/components/atoms/Image'
import { InlineLink } from '@/components/atoms/InlineLink'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'
import { YouTube } from '@/components/organisms/YouTube'
import { A } from '@/components/wrappers'


import Lyrics from './Lyrics.mdx'
import styles from './style.module.scss'

export default function Music() {
  return (
    <>
      <Title title={'つまみのうた'}>
        <p>
          ねぎ一世(
          <InlineLink href="https://twitter.com/negiissei">@negiissei</InlineLink>
          )さんに 「<b>つまみのうた</b>」を作っていただきました！(？？？？)
          ありがとうございます！！！
        </p>
        <p>
          <RichButton as={A} href="https://linkco.re/N4Z8hdvX">
            購入・ストリーミング
          </RichButton>
        </p>
        <Image
          src={'musicbanner'}
          className="tw-my-4"
          width={500}
          height={100}
          alt={'つまみのうたのバナー'}
        />
      </Title>

      <Block title={'カラオケ'} h2icon={'think'}>
        <p>
          「つまみのうた」がJOYSOUNDのうたスキミュージックポスト対応機種で
          <strong>歌えるようになりました！！！</strong>
          (なんで？)
        </p>
        <p>
          「うたスキ」「うたスキ動画」の両方に対応した店舗で歌えるらしいので、カラオケ行く人はよろしくお願いします。
          僕は歌いません。(？)
        </p>
        <div>
          <RichButton as={A} href="https://musicpost.joysound.com/music/musicId:107765">
            楽曲詳細
          </RichButton>
          <RichButton as={A} href="https://www.joysound.com/web/shop/list?m6=1&m5=1&m4=1&m3=1">
            店舗検索
          </RichButton>
        </div>
      </Block>

      <Block title={'歌詞'}>
        <div id={styles.lyrics}>
          <Lyrics />
        </div>
      </Block>

      <Block title={'フル音源'} h2icon={'robot'}>
        <p>各種音楽配信サイトで配信中！</p>
        <RichButton as={A} href="https://linkco.re/N4Z8hdvX">
          購入・ストリーミング
        </RichButton>
        <p>YouTubeでも公開中！</p>
        <YouTube videoId="VO64Ih8c1yU" />
      </Block>

      <Block title={'ショート版'} h2icon={'robot'}>
        <p>作詞作曲：ねぎ一世</p>
        <YouTube videoId="h5C_yiBEAMg" />
      </Block>
    </>
  )
}
