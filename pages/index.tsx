import type {GetStaticProps, NextPage} from 'next'
import Link from "next/link";
import Layout from "../components/Layout";
import Block from "../components/Block";
import Image from "next/image";
import styles from '../styles/top-page/main.module.scss';

import type {MutualLinkRecord} from '../lib/MutualLinks';
import {getMutualLinkRecords} from '../lib/MutualLinks';

import type {MyLinkRecord} from "../lib/MyLinks";
import {getMyLinkRecords} from '../lib/MyLinks';
import Title from "../components/Title";


type PageProps = {
    myLinks: MyLinkRecord[],
    mutualLinks: MutualLinkRecord[]
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
    const myLinks: MyLinkRecord[] = await  getMyLinkRecords();
    const mutualLinks: MutualLinkRecord[] = await getMutualLinkRecords();
    return {
        props: {
            myLinks,
            mutualLinks
        }
    }
}

const Home: NextPage<PageProps> = ({myLinks, mutualLinks}: PageProps) => {
    return (
        <Layout>
            <Title title="ようこそ！">
                <p>
                    このサイトは現在の<Link href={'https://trpfrog.net'}><a>つまみネット</a></Link>を{' '}
                    Next.js で書き直すための仮設サイトです。詳しくは「next.つまみネットについて」をご覧ください。
                </p>
                <p>
                    <Link href={'/about-next'}>
                        <a className="linkButton">next.つまみネットについて</a>
                    </Link>
                </p>
            </Title>
            <div id={styles.top_page_grid}>
                <Block id={styles.about_me_grid}>
                    <div id={styles.my_name}>
                        <p>つまみ</p>
                    </div>
                    <div id={styles.about_me_text}>
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
                    </div>
                    <div id={styles.about_me_image}>
                        <div id={styles.profile_image_wrapper}>
                            <Image
                                id={styles.profile_image}
                                src={'/images/trpfrogvector.svg'}
                                width={'400'}
                                height={'400'}
                                layout={'responsive'}
                                // objectFit={'cover'}
                                alt={'つまみさんのアイコン'}
                            />
                        </div>
                    </div>
                </Block>

                <Block title={'ストア'} h2icon={'otaku'} id={styles.sticker}>
                    <p>
                        工事中
                    </p>
                </Block>
                <Block title={'作ったアイコン'} h2icon={'evil'} id={styles.icons}>
                    <p>
                        工事中
                    </p>
                </Block>

                <Block title={'つまみのうた'} h2icon={'noa'} id={styles.music}>
                    <p>
                        工事中
                    </p>
                </Block>

                <Block title={'風船コーナー'} h2icon={'ice'} id={styles.balloon}>
                    <p>
                        工事中
                    </p>
                </Block>

                <Block title={'Stats'} h2icon={'robot'} id={styles.stats}>
                    <p>
                        工事中
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

                <Block title={'リンク集'} h2icon={'robot'} id={styles.links}>
                    <table>
                        <tbody>
                        {myLinks.map(({ url, siteName, description }) => (
                            <tr key={siteName}>
                                <td>
                                    <Link href={url}>
                                        <a className="linkButton">{siteName}</a>
                                    </Link>
                                </td>
                                <td>
                                    {description}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <h2 className="hina">相互リンク</h2>
                    <p>
                        オタク各位のWebサイトです。ハンドルネームをUTF-8でソートした順。
                        <s>片想いリンクになったやつもある</s>
                    </p>
                    <table>
                        <tbody>
                            {mutualLinks.map(({ url, siteName, ownerName, twitterId, description }) => (
                                <tr key={siteName}>
                                    <td>
                                        <Link href={url}>
                                            <a className="linkButton">{siteName}</a>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link href={`https://twitter.com/${twitterId}/`}>
                                            <a>{ownerName}</a>
                                        </Link>さんのHP。<br/>
                                        {description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Block>

                <Block title={'特に意味のない鳥'} h2icon={'think'} id={styles.bird}>
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
                </Block>
            </div>
        </Layout>
    )
}

export default Home
