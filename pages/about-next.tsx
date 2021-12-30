import type {NextPage} from 'next'
import Link from "next/link";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";

const About: NextPage = () => {
    return (
        <Layout>
            <Title title={'next.つまみネット について'}>
                <p>
                    ここは Next.js + TypeScript で<Link href={'https://trpfrog.net'}><a>つまみネット</a></Link>
                    を書き直す実験ページです。工事中です。
                </p>
                <p>
                    うまくいけば将来的につまみネットをNext.js製のこれで置き換えたいと考えています。
                </p>
            </Title>
            <Block title={'なぜ？'}>
                <ul>
                    <li>HTML/CSS/JavaScript で一から作る温かみのあるサイト作りも楽しいけど、
                        周辺ツール作りでちょっとつらくなってきた</li>
                    <li>あと単純にNext.jsが面白そうだった</li>
                </ul>
            </Block>
            <Block title={'移植状況'} h2icon={'robot'}>
                <ul>
                    <li>2021/12/24</li>
                    <ul>
                        <li>サイトの共通部分をだいたい移植した</li>
                        <li>作業環境ページをほぼ100%移植した</li>
                    </ul>
                    <li>2021/12/27</li>
                    <ul>
                        <li>リンク集を移植した</li>
                        <li>トップページの体裁を整えた</li>
                    </ul>
                    <li>2021/12/28</li>
                    <ul>
                        <li>リンク集の形式を見やすく変えた</li>
                        <li>画像サーバにCloudinaryを採用して高速化</li>
                        <ul>
                            <li>既知の問題: 設定が間違っているのかサーバの応答が異様に遅い</li>
                        </ul>
                        <li>スタンプ一覧ページを追加</li>
                        <li>ストアリンクをトップページに追加</li>
                        <li>つまみのうた情報をトップページに追加</li>
                        <li>つまみのうたの歌詞を追加</li>
                        <li>プロフィールを追加</li>
                        <li>仮のサイト内リンク集を作成</li>
                    </ul>
                    <li>2021/12/30</li>
                    <ul>
                        <li>アイコン集のページを追加</li>
                        <li>スタンプ集・アイコン集に拡大表示を追加</li>
                        <li>相互リンクが増えてきたので移動</li>
                        <li>トップページにアイコン紹介を追加</li>
                        <li>Statsの廃止に関する案内を追加</li>
                        <li>GlobalなCSSにSCSSを採用</li>
                    </ul>
                </ul>
            </Block>
            <Block title={'Todo'} h2icon={'think'}>
                <ul>
                    <li>たくさん</li>
                    <li>まずはトップページの移植？</li>
                    <li>それからハンバーガーメニューの移植</li>
                </ul>
            </Block>
            <Block title={'やってみてどう？'} h2icon={'ice'}>
                <ul>
                    <li>共通部分を作るのが楽</li>
                    <li>ただフレームワークなしの方が融通が効くところもあり、ちょっと書くのがつらい</li>
                    <li>でも慣れと知識量の問題っぽくはある</li>
                    <li>完全移植はまだ先が長そうでｸﾞｴ-という感じ</li>
                </ul>
            </Block>
        </Layout>
    )
}

export default About

