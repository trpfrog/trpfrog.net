import type {NextPage} from 'next'
import Image from 'next/image'

import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import styles from '../styles/music.module.scss';

const Music: NextPage = () => {
    return (
        <Layout>
            <Title title={'つまみのうた'}>
                <p>
                    ねぎ一世(<a href="https://twitter.com/negiissei">@negiissei</a>)さんに「<b>つまみのうた</b>」を作っていただきました！(？？？？)
                    ありがとうございます！！！
                </p>
                <p>
                    <a href="https://linkco.re/N4Z8hdvX" className="linkButton">購入・ストリーミング</a>
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
                    「つまみのうた」がJOYSOUNDのうたスキミュージックポスト対応機種で<b>歌えるようになりました！！！</b>(なんで？)
                </p>
                <p>
                    「うたスキ」「うたスキ動画」の両方に対応した店舗で歌えるらしいので、カラオケ行く人はよろしくお願いします。
                    僕は歌いません。(？)
                </p>
                <p className={'link-area'}>
                    <a href="https://musicpost.joysound.com/music/musicId:107765">楽曲詳細</a>
                    <a href="https://www.joysound.com/web/shop/list?m6=1&m5=1&m4=1&m3=1">店舗検索</a>
                </p>
            </Block>
            <Block title={'歌詞'}>
                <div id={styles.lyrics}>
                    <p>
                        <span>「キウイおいしかった！」</span>
                    </p>

                    <p>
                        <span>最初は</span><span>かえるけろけろ</span><br/>
                        <span>そして</span><span>しいたけの時も</span><span>ありました</span><br/>
                        <span>いいこともあって</span><span>思い出だけど</span><br/>
                        <span>今ではもう</span><span>ツイ消しされていた</span>
                    </p>

                    <p>
                        <span>Frog Life Up!</span>
                    </p>

                    <p>
                        <span>TrpFrogになって</span><br/>
                        <span>まだ見ない</span><span>自分に</span><span>変わっちゃおう</span><br/>
                        <span>よろしく〜</span>
                    </p>

                    <p>
                        <span>つまみちゃん</span><span>って呼ばれてます</span><br/>
                        <span>変わりものです</span><br/>
                        <span>今はないのだから</span><span>覚えてほしい</span> <span>始めの</span>
                    </p>

                    <p>
                        <span>「キウイおいしかった！」</span>
                    </p>

                    <p>
                        <span>忙しく徹夜</span><span>カフェインにまみれ</span><br/>
                        <span>草木に怯え生きてます</span><br/>
                        <span>嫌な事あって</span><span>落ち込むけれど</span><br/>
                        <span>いつか行けたらいいな</span> <span>けろパーク</span>
                    </p>

                    <p>
                        <span>Frog Life Up!</span>
                    </p>

                    <p>
                        <span>変わらないことも</span><span>いいでしょ</span><br/>
                        <span>昔から</span><span>かわいいもの好き！</span><br/>
                        <span>女子かも？</span>
                    </p>

                    <p>
                        <span>つまみちゃんを</span><span>つままないで</span><br/>
                        <span>でりけーとなの！</span><br/>
                        <span>もしも触れることが</span><span>あるなら</span> <span>覚悟してよね</span><br/>
                        <span>わたし</span><span>かわいいでしょ？</span>
                    </p>

                    <p>
                        <span>あ〜やりたいことが</span><span>まだまだあるの</span><br/>
                        <span>想像だけで</span><span>ドキドキしちゃう</span><br/>
                        <span>夢はみるだけなら</span><span>損はしないから</span><br/>
                        <span>恐れず行こう</span><span>扉のむこうへ！</span>
                    </p>

                    <p>
                        <span>でも不安だけは</span><span>消えないから</span> <span>弱気になるの</span><br/>
                        <span>それでもまだ</span><span>見ててほしいよ</span> <span>強くなるから……</span><br/>
                        <span>よろしく！</span>
                    </p>

                    <p>
                        <span>つまみちゃん</span><span>って呼ばれてます</span><br/>
                        <span>変わりものです</span><br/>
                        <span>今はないのだから</span><span>覚えてほしい</span> <span>始めの</span>
                    </p>

                    <p>
                        <span>「キウイおいしかった！」</span>
                    </p>
                </div>
            </Block>
            <Block title={'フル音源'} h2icon={'robot'}>
                <p>
                    各種音楽配信サイトで配信中！買ってね (お金が入るので)
                </p>
                <p>
                    <a href="https://linkco.re/N4Z8hdvX" className="linkButton">購入・ストリーミング</a>
                </p>
                <p>
                    YouTubeでも公開中！
                </p>
                <div className="youtube-outer">
                    <LiteYouTubeEmbed
                        id="VO64Ih8c1yU"
                        title="つまみのうた"
                    />
                </div>
            </Block>
            <Block title={'ショート版'} h2icon={'robot'}>
                <p>
                    作詞作曲：ねぎ一世
                </p>
                <div className="youtube-outer">
                    <LiteYouTubeEmbed
                        id="h5C_yiBEAMg"
                        title="つまみのうた"
                    />
                </div>
            </Block>
        </Layout>
    )
}

export default Music

