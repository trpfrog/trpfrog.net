import Image from 'next/legacy/image'

import { Button } from '@/components/atoms/Button'
import { InlineLink } from '@/components/atoms/InlineLink'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'
import { YouTube } from '@/components/organisms/YouTube'

import Lyrics from './Lyrics.mdx'
import styles from './style.module.scss'

export default function Music() {
  return (
    <>
      <Title title={'つまみのうた'}>
        <p>
          ねぎ一世(
          <InlineLink href="https://twitter.com/negiissei">
            @negiissei
          </InlineLink>
          )さんに 「<b>つまみのうた</b>」を作っていただきました！(？？？？)
          ありがとうございます！！！
        </p>
        <p>
          <Button externalLink={true} href="https://linkco.re/N4Z8hdvX">
            購入・ストリーミング
          </Button>
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
        <div className={'link-area'}>
          <Button href={'https://musicpost.joysound.com/music/musicId:107765'}>
            楽曲詳細
          </Button>
          <Button
            href={'https://www.joysound.com/web/shop/list?m6=1&m5=1&m4=1&m3=1'}
          >
            店舗検索
          </Button>
        </div>
      </Block>

      <Block title={'歌詞'}>
        <div id={styles.lyrics}>
          <Lyrics />
        </div>
      </Block>

      <Block title={'フル音源'} h2icon={'robot'}>
        <p>各種音楽配信サイトで配信中！</p>
        <Button externalLink={true} href="https://linkco.re/N4Z8hdvX">
          購入・ストリーミング
        </Button>
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
