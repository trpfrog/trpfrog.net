import type {NextPage} from 'next'
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";
import {GetStaticProps} from "next";
import {WalkingArticleRecord, getWalkingArticleRecords} from "../lib/WalkingArticles";

import styles from '../styles/walking.module.scss';

type PageProps = {
    articles: WalkingArticleRecord[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const articles: WalkingArticleRecord[] = await getWalkingArticleRecords();
    return {
        props: {
            articles
        }
    }
}


const About: NextPage<PageProps> = ({articles}) => {
    return (
        <Layout>
            <Title title={'徒歩情報'}>
                <p>
                    長距離を歩いて移動することは面白いと言われています。
                </p>
            </Title>
            <Block title={'徒歩記事まとめ'}>
                <div id={styles.articles}>
                    {articles.map(e => (
                        <div key={e.url} className={styles.article_block}>
                            <h3>{e.title}</h3>
                            <p>
                                Written by <b>{e.author}</b> on {e.siteName}<br/>
                                {e.date} - {e.distance}
                            </p>
                            <p>
                                <a className="linkButton" href={e.url}>記事を読む</a>
                            </p>
                        </div>
                    ))}
                </div>
            </Block>
        </Layout>
    )
}

export default About

