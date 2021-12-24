import type {NextPage} from 'next'
import Link from "next/link";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";

const Home: NextPage = () => {
    return (
        <Layout>
            <Title title={'ようこそ！'}>
                <p>
                    ここは Next.js + TypeScript で<Link href={'https://trpfrog.net'}><a>つまみネット</a></Link>を書き直す実験ページです。工事中です。
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
                    <li>サイトの共通部分をだいたい移植した</li>
                    <li>作業環境ページをほぼ100%移植した</li>
                    <ul>
                        <li>おそらく遷移が爆速になっているはずです</li>
                        <li>スマホの人は<Link href="/environment"><a>ここ</a></Link>からアクセスしてください</li>
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

export default Home
