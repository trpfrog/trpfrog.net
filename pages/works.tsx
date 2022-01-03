import type {NextPage} from 'next'
import Link from "next/link";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";
import styles from '../styles/works.module.scss';
import {FunctionComponent} from "react";
import Image from 'next/image';

type KeywordsType = {
    keywords: string[]
}

const Keywords: FunctionComponent<KeywordsType> = ({children, keywords}) => {
    return (
        <p className={styles.keywords}>
            <span className={styles.keyword_title}>TECHNOLOGIES</span><br/>
            {keywords.map(k =>
                <span key={k} className={styles.keyword}>{k}</span>
            )}
        </p>
    );
}

const Works: NextPage = () => {
    return (
        <Layout>
            <Title
                title={'Works'}
                description={'つまみさんの作った作品・ソフトウェア・Webサイトのまとめページです。'}
            >
                <p>
                    最終更新: 2022/1/2
                </p>
            </Title>

            <Block title={'Otaku Discord Channels'} h2icon={'otaku'}>
                <div className={styles.hero_image}>
                    <Image
                        src={'works/otaku-discord'}
                        width={3110}
                        height={1721}
                        layout={'responsive'}
                        objectFit={'cover'}
                        alt={'Otaku Discord の画像'}
                    />
                </div>
                <Keywords keywords={[
                    'Python', 'Discord API', 'JavaScript'
                ]}/>
                <p>
                    <b>Released:</b> 2021/12/16
                </p>
                <p>
                    UEC 2 Advent Calendar 2021 16日目のネタとして作った謎サイト。
                </p>
                <p>
                    チャンネルを増やすことを生業としている最悪のオタクが生息するDiscordサーバの{}
                    チャンネル一覧を晒すためのサイト。
                </p>
                <p>
                    PythonでDiscord APIを叩いてJSファイルにまとめ、JavaScriptで整形して画面に表示する。
                    GitHub Actions との併用で毎日1回最新情報がデプロイされる。
                </p>
                <p className={'link-area'}>
                    <a
                        href="https://github.com/TrpFrog/otaku-channels"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a
                        href="https://otaku-discord.trpfrog.net"
                        target="_blank"
                        rel="noopener noreferrer">
                        Webサイト
                    </a>
                    <a
                        href="https://trpfrog.net/notes/otaku-channels/index.html"
                        target="_blank"
                        rel="noopener noreferrer">
                        ブログ記事
                    </a>
                </p>
            </Block>

            <Block title={'Clover Bridge'}>
                <div className={styles.hero_image}>
                    <Image
                        src={'works/clover-bridge'}
                        width={800}
                        height={628}
                        layout={'responsive'}
                        objectFit={'cover'}
                        alt={'Clover Bridge の画像'}
                    />
                </div>
                <Keywords keywords={[
                    'OpenGL', 'C++'
                ]}/>
                <p>
                    <b>Created:</b> 2021/12/1
                </p>
                <p>
                    メディア情報学実験のOpenGL回で作成した
                    「<a href="https://goo.gl/maps/ZWmQnU2A28aHteVC7">小名木川クローバー橋</a>」
                    っぽい3Dモデル。
                </p>
                <p>
                    制作期間約1週間でゴリ押したので細部までは作っていない。
                    OpenGLで作るのがあまりにもつらすぎてモデリングソフトは偉大だ……となった。
                </p>
                <p className={'link-area'}>
                    <a
                        href="https://github.com/TrpFrog/clover-bridge"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>
                </p>
            </Block>

            <Block title={'Timetable Page'}>
                <div className={styles.hero_image}>
                    <Image
                        src={'works/timetable-page'}
                        width={1396}
                        height={1094}
                        layout={'responsive'}
                        objectFit={'cover'}
                        alt={'Timetable Page の画像'}
                    />
                </div>
                <Keywords keywords={[
                    'HTML', 'CSS', 'JavaScript', 'Docker'
                ]}/>
                <p>
                    <b>Released:</b> 2021/10/5
                </p>
                <p>
                    大学の時間割を模したホームページが作れるソフトウェア。付属の timetable.js に
                    「授業名」「時限」「担当者名」「授業ホームページ」「遠隔授業参加URL」などを書くと、
                    それに合わせてサイトが生成される。
                </p>
                <p>
                    timetable.js は授業の構造体のみが書かれた JavaScript ファイルであり、
                    JSONファイルを扱うように書くことができ、特別なプログラミングの技術を必要としない。
                </p>
                <p>
                    index.html にデータは反映されるが、配布しているDockerコンテナを使ってWebサーバを立てることも可能。
                </p>
                <p className={'link-area'}>
                    <a
                        href="https://github.com/TrpFrog/timetable-page"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a
                        href="https://github.com/TrpFrog/timetable-page/pkgs/container/timetable"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub Packages
                    </a>
                </p>
            </Block>

            <Block title={'元素記号学習サイト'}>
                <div className={styles.hero_image}>
                    <Image
                        src={'works/elements-learning'}
                        width={1241}
                        height={1020}
                        layout={'responsive'}
                        objectFit={'cover'}
                        alt={'Timetable Page の画像'}
                    />
                </div>
                <Keywords keywords={[
                    'HTML', 'CSS', 'JavaScript', 'Cookie'
                ]}/>
                <p>
                    <b>Released:</b> 2021/6/15
                </p>
                <p>
                    プログラミング言語実験のJavaScript回で作成した元素記号を覚えるためのサイト。
                </p>
                <p>
                    「記号 → 日本語名」「記号 → 英語名」「日本語名 → 記号」「英語名 → 記号」
                    の4種類のクイズに答えることができ、その結果はCookieに記録される。
                    この記録を用いて周期表から正誤を確認できる。
                </p>
                <p className={'link-area'}>
                    <a
                        href="https://github.com/TrpFrog/elements-learning"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a
                        href="https://trpfrog.github.io/elements-learning/"
                        target="_blank"
                        rel="noopener noreferrer">
                        Webサイト
                    </a>
                </p>
            </Block>

            <Block title={'Space Wandering'}>
                <div className={styles.hero_image}>
                    <Image
                        src={'works/space-wandering'}
                        width={2776}
                        height={1958}
                        layout={'responsive'}
                        objectFit={'cover'}
                        alt={'Space Wandering の画像'}
                    />
                </div>
                <Keywords keywords={[
                    'Java', 'Swing'
                ]}/>
                <p>
                    <b>Released:</b> 2021/2/24
                </p>
                <p>
                    大学の「メディア情報学プログラミング演習」で作成したJava製のゲーム。
                </p>
                <p>
                    <a href="https://hutinoatari.dev" target="_blank"
                       rel="noopener noreferrer">淵野アタリ</a>さんと
                    <a href="https://prgckwb.github.io" target="_blank"
                       rel="noopener noreferrer">ちくわぶ</a>さんとの合作。
                </p>
                <p className={'link-area'}>
                    <a
                        href="https://github.com/TrpFrog/medipro-game"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a
                        href="https://trpfrog.github.io/medipro-game"
                        target="_blank"
                        rel="noopener noreferrer">
                        公式サイト
                    </a>
                    <a
                        href="https://trpfrog.github.io/medipro-game/presentation.pdf"
                        target="_blank"
                        rel="noopener noreferrer">
                        プレゼンPDF
                    </a>
                </p>
            </Block>

            <Block title={'TwitterScreen'}>
                <div className={styles.hero_image}>
                    <Image
                        src={'works/twitter-screen'}
                        width={1200}
                        height={670}
                        layout={'responsive'}
                        objectFit={'cover'}
                        alt={'Twitter Screen の画像'}
                    />
                </div>
                <Keywords keywords={[
                    'Java', 'Swing', 'Twitter API'
                ]}/>
                <p>
                    <b>Released:</b> 2020/11/23
                </p>
                <p>
                    ある検索ワードにヒットした単語を透明のスクリーンに表示するソフトウェア。
                </p>
                <p className={'link-area'}>
                    <a
                        href="https://github.com/TrpFrog/twitter-screen"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a
                        href="https://trpfrog.hateblo.jp/entry/twitter-screen"
                        target="_blank"
                        rel="noopener noreferrer">
                        ブログ記事
                    </a>
                </p>
            </Block>

            <Block title={'つまみネット (3代目)'}>
                <div className={styles.hero_image}>
                    <Image
                        src={'works/trpfrog-net-3rd'}
                        width={2324}
                        height={1794}
                        layout={'responsive'}
                        objectFit={'cover'}
                        alt={'つまみネット3代目の画像'}
                    />
                </div>
                <Keywords keywords={[
                    'HTML', 'CSS', 'JavaScript', 'Python'
                ]}/>
                <p>
                    <b>Published:</b> 2020/2/28
                </p>
                <p>
                    デザインの大規模変更、アイコンメーカーの追加、
                    Pythonによる自作サイトジェネレータを使った雑ブログの追加、
                    アイコンメーカーや徒歩情報など大量にコンテンツを追加したつまみネット3代目。
                </p>
                <p className={'link-area'}>
                    <a
                        href="https://github.com/TrpFrog/trpfrog-net"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a
                        href="https://trpfrog.net"
                        target="_blank"
                        rel="noopener noreferrer">
                        Webサイト
                    </a>
                </p>
            </Block>

            <Block title={'Cookie Animation'}>
                <div className={styles.hero_image} style={{maxHeight: '300px', maxWidth: '200px'}}>
                    <Image
                        src={'works/cookie-animation'}
                        width={200}
                        height={300}
                        layout={'responsive'}
                        objectFit={'cover'}
                        alt={'Cookie Animationの画像'}
                    />
                </div>
                <Keywords keywords={[
                    'C programming'
                ]}/>
                <p>
                    <b>Released:</b> 2020/2/12
                </p>
                <p>
                    基礎プログラミングで作成したCookie Clickerの再現アニメーション。
                </p>
                <p>
                    実際どうなのかは今更コードを見る気が起きないので不明だが、メモリリークと戦っていた気がする。
                </p>
                <p>
                    <a href="https://twitter.com/croute_pillow" target="_blank"
                       rel="noopener noreferrer">無果汁コロッケマン</a>さんとの合作。
                </p>
                <p className={'link-area'}>
                    <a
                        href="https://github.com/TrpFrog/CookieAnimation"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a
                        href="https://github.com/TrpFrog/CookieAnimation/blob/master/anim.gif"
                        target="_blank"
                        rel="noopener noreferrer">
                        アニメーション (10.7MB)
                    </a>
                </p>
            </Block>

            <Block title={'つまみネット (2代目)'}>
                <div className={styles.hero_image}>
                    <Image
                        src={'works/trpfrog-net-2nd'}
                        width={2342}
                        height={2766}
                        layout={'responsive'}
                        objectFit={'cover'}
                        alt={'つまみネット2代目の画像'}
                    />
                </div>
                <Keywords keywords={[
                    'HTML', 'CSS', 'JavaScript'
                ]}/>
                <p>
                    <b>Published:</b> 2019/7/13
                </p>
                <p>
                    CSS Grid Layout の採用, JavaScriptによるヘッダーの共通化,
                    風船コーナーの追加, アイコン・スタンプギャラリーの追加など{}
                    コンテンツの増量を行ったつまみネット2代目。
                </p>
                <p>
                    下のGitHubのリンクからZipファイルをDLするとローカルで見られます。
                </p>
                <p className={'link-area'}>
                    <a
                        href="https://github.com/TrpFrog/trpfrog-net/commit/9ab453ac255a010efdb593ef1a9d92930b9d5f2e"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>
                </p>
            </Block>

            <Block title={'つまみネット (初代)'}>
                <div className={styles.hero_image}>
                    <Image
                        src={'works/trpfrog-net-1st'}
                        width={1736}
                        height={2022}
                        layout={'responsive'}
                        objectFit={'cover'}
                        alt={'つまみさんのHPの画像'}
                    />
                </div>
                <Keywords keywords={[
                    'HTML', 'CSS'
                ]}/>
                <p>
                    <b>Published:</b> 2019/6/15
                </p>
                <p>
                    ホームページ制作ツールを使わずに作った最初のホームページ。GitHub Pages で公開していた。
                </p>
                <p>
                    下のGitHubのリンクからZipファイルをDLするとローカルで見られます。
                </p>
                <p className={'link-area'}>
                    <a
                        href="https://github.com/TrpFrog/trpfrog-net/tree/5bca766b93b6070760cdf96f25c47b114b9ea73b"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>
                </p>
            </Block>

            <Block title={'つまみロボ'}>
                <Keywords keywords={[
                    'Java', 'Twitter API'
                ]}/>
                <p>
                    <b>Released:</b> 2016/4/26
                </p>
                <p>
                    Twitter bot。ランダムにダジャレを投稿したり、
                    ユーザの返信に反応しておみくじを引いたり、わかち書きを返したり(？)、
                    Hit and Blowで遊べたりした。
                </p>
                <p>
                    現在、諸事情で運用停止中。
                </p>
                <p>
                    あまりにも昔のコードすぎて汚さがとてつもなく、別言語で書き直しているという噂がある。
                </p>
                <p className={'link-area'}>
                    <a
                        href="https://github.com/TrpFrog/FrogRobo"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a
                        href="https://twitter.com/FrogRobo"
                        target="_blank"
                        rel="noopener noreferrer">
                        つまみロボ (停止中)
                    </a>
                </p>
            </Block>
        </Layout>
    )
}

export default Works