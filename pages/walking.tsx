import type {NextPage} from 'next'
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";
import {GetStaticProps} from "next";

import {BlogPost, getSortedPostsData} from "../lib/blog/load";
import ArticleCard, {ArticleGrid} from "../components/blog/ArticleCard";

type PageProps = {
    articles: BlogPost[]
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const tag = '徒歩'
    const articles = await getSortedPostsData(tag)
    return {
        props: {
            articles
        }
    }
}

const About: NextPage<PageProps> = ({articles}) => {
    return (
        <Layout>
            <Title
                title={'徒歩情報'}
                description={'長距離を歩いて移動することは面白いと言われています。'}
            />
            <Block title={'新着徒歩記事'}>
                <p>
                    つまみログに書いた「<b>徒歩</b>」タグの新着記事です。
                    その他の徒歩記事は <a href={'https://walk.trpfrog.net'}>WALKICLES</a> をご覧ください。
                </p>
            </Block>
            <ArticleGrid>
                {articles.slice(0, 6).map(entry => <ArticleCard entry={entry} key={entry.slug}/>)}
            </ArticleGrid>

            <Block title={'持ち物'}>
                <p>
                    徒歩会に参加するときの持ち物を紹介します。
                </p>
                <h3>必要なもの</h3>
                <ul>
                    <li>携帯電話</li>
                    <ul>
                        <li>徒歩記事の写真を撮るのに必須</li>
                        <li>カメラでも良いがジオタグが付くものができれば欲しい</li>
                    </ul>
                    <li>充電ケーブル</li>
                    <li>モバイルバッテリー</li>
                    <ul>
                        <li>大量に写真を撮るとすぐに電池が切れる</li>
                    </ul>
                    <li>財布</li>
                    <ul>
                        <li>帰宅用の交通費があった方が良い</li>
                        <li>お昼代とかも</li>
                    </ul>
                    <li>薄めの上着</li>
                    <ul>
                        <li>できるだけ持ち物は減らした方が良い</li>
                    </ul>
                    <li>マスクとその予備</li>
                    <ul>
                        <li>マスクびしょ濡れ男になる可能性がある</li>
                    </ul>
                    <li>足を破壊しない靴</li>
                    <li>肩を破壊しないリュック</li>
                    <ul>
                        <li>まあ……</li>
                    </ul>
                </ul>

                <h3>あると良さそうなもの</h3>
                <ul>
                    <li>折り畳み傘</li>
                    <ul>
                        <li>基本雨降りそうな日は徒歩会をしない方が良いが……</li>
                    </ul>
                    <li>仮面</li>
                    <ul>
                        <li>顔を隠して写真が撮れる</li>
                    </ul>
                </ul>

                <h3>いらないもの</h3>
                <ul>
                    <li>重い水筒</li>
                    <ul>
                        <li>ペットボトルなら飲み終わったら捨てられるので</li>
                        <li>肩破壊部になるものは避ける</li>
                    </ul>
                    <li>ノートパソコン</li>
                    <li>タブレット</li>
                    <ul>
                        <li>ゴールで進捗を生む会をする特殊な場合を除いて絶対使わない</li>
                        <li>肩破壊部になるものは避ける</li>
                    </ul>
                </ul>
            </Block>
        </Layout>
    )
}

export default About

