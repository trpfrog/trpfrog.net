import type {GetStaticProps, NextPage} from 'next'
import Link from "next/link";
import Layout from "../components/Layout";
import Block from "../components/Block";
import Image from "next/image";
import styles from '../styles/top-page/main.module.scss';

import {MyLinkRecord, getMyLinkRecords} from '../lib/MyLinks';

import Title from "../components/Title";
import {BalloonBox} from './balloon';

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import {NextSeo} from "next-seo";
import {motion} from "framer-motion";
import TrpFrogAnimation from "../components/TrpFrogAnimation";


type PageProps = {
    myLinks: MyLinkRecord[]
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
    const myLinks: MyLinkRecord[] = await getMyLinkRecords();
    return {
        props: {
            myLinks
        }
    }
}

const Home: NextPage<PageProps> = ({myLinks}: PageProps) => {

    const mainWrapperStyle = {
        display: 'block',
        maxWidth: '100000px',
        margin: '0',
        width: '100%',
        textAlign: 'center'
    }

    return (
        <Layout style={mainWrapperStyle}>
            <NextSeo
                title={'つまみネット'}
                description={'さかなになりたいね'}
            />

            <TrpFrogAnimation />

            <motion.div
                id={styles.top_page_grid_wrapper}
                initial={{ y: 'calc(-1 * var(--anim-height))' }}
                animate={{ y: 0 }}
                transition={{
                    delay: 0.4,
                    duration: 1
                }}
            >
                <div id={styles.top_page_grid}>
                    <Block id={styles.about_me_grid}>
                        <div id={styles.my_name}>
                            <p>つまみ</p>
                        </div>
                        <p>
                            電気通信大学の大学生。東京都(23区ではない方)出身。
                        </p>
                        <p>
                            コンピュータ(レイヤー高め)で遊ぶのが好き。競技プログラミング(C++)をしたり、
                            なんか<a href="https://github.com/TrpFrog">いろいろ</a>作ったりしている。
                        </p>
                        <p>
                            最近では大学のオタクと<a href="https://trpfrog.hateblo.jp">鬼の仮面を被ってお散歩</a>をよくしている。
                        </p>
                    </Block>

                    <Block title={'お知らせ'} h2icon={'robot'} id={styles.whats_new}>
                        <p>
                            つまみネットを Next.js で書き直しました！詳細は以下のリンクをご覧ください。
                        </p>
                        <p>
                            <Link href={'/about-next'}>
                                <a className="linkButton">next.つまみネットについて</a>
                            </Link>
                        </p>
                    </Block>

                    <Block title={'ストア'} h2icon={'otaku'} id={styles.sticker}>
                        <p>
                            つまみさんのスタンプ・グッズ<br/>
                            好評発売中！
                        </p>
                        <div className={styles.link_grid}>
                            <div className={styles.link_block}>
                                <a
                                    href="https://store.line.me/stickershop/product/4674940/ja"
                                    className="linkButton"
                                >LINEスタンプ vol.1</a>
                            </div>
                            <div className={styles.link_block}>
                                <Image
                                    src={'sticker_pr'}
                                    width={18}
                                    height={15}
                                    className={'rich_image'}
                                    layout={'responsive'}
                                    objectFit={'contain'}
                                    alt={'つまみグッズの画像'}
                                />
                                <a
                                    href="https://store.line.me/stickershop/product/8879469/ja"
                                    className="linkButton"
                                    style={{marginTop: '10px'}}
                                >LINEスタンプ vol.2</a>
                            </div>
                            <div className={styles.link_block}>
                                <Image
                                    src={'goods'}
                                    width={100}
                                    height={70}
                                    layout={'responsive'}
                                    objectFit={'contain'}
                                    alt={'つまみグッズの画像'}
                                />
                                <a
                                    href="https://suzuri.jp/TrpFrog"
                                    className="linkButton"
                                >つまみグッズ on SUZURI</a>
                            </div>
                        </div>
                    </Block>

                    <Block title={'作ったアイコン'} h2icon={'evil'} id={styles.icons}>
                        <div className={styles.top_icons}>
                            {[0, 7, 5, 6].map(i => i.toString()).map(i => (
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
                        <Link href={'/icons'}>
                            <a className="linkButton">もっと見る</a>
                        </Link>
                    </Block>

                    <Block title={'つまみのうた'} h2icon={'noa'} id={styles.music}>
                        <p>
                            ねぎ一世(<a href="https://twitter.com/negiissei">@negiissei</a>)さんに「<b>つまみのうた</b>」を作っていただきました！(？？？？)
                            ありがとうございます！！！
                        </p>
                        <div className="youtube-outer">
                            <LiteYouTubeEmbed
                                id="h5C_yiBEAMg"
                                title="つまみのうた"
                            />
                        </div>
                        <p>
                            Apple Music, Spotify, YouTube Music, LINE Music 他 各種サイトで配信中！(なんで？)
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
                        <p className={'link-area'}>
                            <a href="https://linkco.re/N4Z8hdvX">購入/ストリーミング</a>
                            <Link href={'music'}><a>歌詞</a></Link>
                        </p>
                    </Block>

                    <Block title={'風船コーナー'} h2icon={'ice'} id={styles.balloon}>
                        <div id={styles.top_balloon_grid}>
                            {Array.from(Array(7), (v, k) => <BalloonBox key={k} width={'100%'} height={'100%'}/>)}
                        </div>
                        <p>
                            <Link href={'/balloon'}>
                                <a className={'linkButton'}>もっと割る</a>
                            </Link>
                        </p>
                    </Block>

                    <Block title={'リンク集'} h2icon={'robot'} id={styles.links}>
                        <div className={styles.link_grid}>
                            {myLinks.map(({ url, siteName, description }) => (
                                <div key={siteName} className={styles.link_block}>
                                    <p style={{textAlign: "center"}}>
                                        <Link href={url}>
                                            <a className="linkButton">{siteName}</a>
                                        </Link>
                                    </p>
                                    <p>
                                        {description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <h2 className="hina">相互リンク</h2>
                        <p>
                            移動しました！
                        </p>
                        <p>
                            <Link href={'/links'}>
                                <a className={'linkButton'}>相互リンク</a>
                            </Link>
                        </p>
                    </Block>

                    <Block title={'音楽ゲーム'} h2icon={'pumpkin'} id={styles.music_game}>
                        <ul className={styles.rating_list}>
                            <li><b>チュウニズム</b><br/>
                                <span className={styles.rainbow} style={{fontSize: '2em'}}>max</span>
                                <span className={styles.rainbow} style={{fontSize: '2.8em'}}>15.03</span>
                            </li>
                            <li><b>オンゲキ</b><br/>
                                <span className={styles.platinum} style={{fontSize: '2em'}}>max</span>
                                <span className={styles.platinum} style={{fontSize: '2.8em'}}>14.84</span>
                            </li>
                            <li><b>SOUND VOLTEX</b><br/>
                                <span className={styles.silver} style={{fontSize: '2.5em'}}>魔騎士</span>
                            </li>
                        </ul>
                        <h2 className="robot">競プロ</h2>
                        <ul className={styles.rating_list}>
                            <li><b>AtCoder</b> (<a href="https://atcoder.jp/users/TrpFrog">TrpFrog</a>) <br/>
                                <span className={styles.water} style={{fontSize: '1.5em'}}>highest</span>
                                <span className={styles.water} style={{fontSize: '2.8em'}}>1572</span>
                            </li>
                            <li><b>Codeforces</b> (<a href="https://codeforces.com/profile/TrpFrog">TrpFrog</a>) <br/>
                                <span className={styles.blue} style={{fontSize: '2em'}}>max</span>
                                <span className={styles.blue} style={{fontSize: '2.8em'}}>1687</span>
                            </li>
                        </ul>
                    </Block>

                    <Block title={'特に意味のない鳥'} h2icon={'think'} id={styles.bird}>
                        <div style={{textAlign: 'center'}}>
                            <pre className={styles.aa}>
                                {"\n　　 ／￣￣＼　ﾑｼｬﾑｼｬ\n"}
                                {"  /　 (●)/￣￣＼\n"}
                                {".　 / 　 　ト、 　 ＼\n"}
                                {"　彳 　 　 ＼＼　　|\n"}
                                {".／　　　/⌒ヽヽ　 |\n"}
                                {"/　 　 　 |　　| .|　 /。\n"}
                                {"　　　　|　　ヽ|／∴\n"}
                                {"　　　　　　　。゜\n"}
                            </pre>
                            <pre className={styles.aa} style={{marginLeft: "20px"}}>
                                {"オエーー !!!　＿＿_\n"}
                                {"　　　 ＿＿_／　　 ヽ\n"}
                                {"　　 ／ 　 ／　／⌒ヽ|\n"}
                                {"/　(ﾟ)/　 ／ /\n"}
                                {".　 /　 　 ﾄ､ /｡⌒ヽ。\n"}
                                {"　彳　 　 ＼＼ﾟ｡∴｡ｏ\n"}
                                {".／　　　　 ＼＼｡ﾟ｡ｏ\n"}
                                {"/　　　　 ／⌒＼Ｕ∴)\n"}
                                {"　　　 　 | 　　ﾞＵ |\n"}
                                {"　　　 　 | 　　　| |\n"}
                                {"　　　　　　　　Ｕ"}
                            </pre>
                        </div>
                    </Block>
                </div>
            </motion.div>
        </Layout>
    )
}

export default Home
