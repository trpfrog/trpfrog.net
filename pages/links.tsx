import type {NextPage} from 'next'
import {getMutualLinkRecords, MutualLinkRecord} from "../lib/MutualLinks";
import {GetStaticProps} from "next";

import styles from "../styles/top-page/main.module.scss";

import Link from "next/link";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";

type PageProps = {
    mutualLinks: MutualLinkRecord[]
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
    const mutualLinks: MutualLinkRecord[] = await getMutualLinkRecords();
    return {
        props: {
            mutualLinks
        }
    }
}

const Links: NextPage<PageProps> = ({mutualLinks}: PageProps) => {
    return (
        <Layout>
            <Title title={'相互リンク'}>
                <p>
                    オタク各位のWebサイトです。ハンドルネームをUTF-8でソートした順。
                    <s>片想いリンクになったやつもある</s>
                </p>
            </Title>
            <Block>
                <div className={styles.link_grid}>
                    {mutualLinks.map(({ url, siteName, ownerName, twitterId, description }) => (
                        <div key={siteName} className={styles.link_block}>
                            <p style={{textAlign: "center"}}>
                                <Link href={url}>
                                    <a className="linkButton">{siteName}</a>
                                </Link>
                            </p>
                            <p>
                                <b><Link href={`https://twitter.com/${twitterId}/`}>
                                    <a>{ownerName}</a>
                                </Link></b>さんのHP
                            </p>
                            <p>
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </Block>
        </Layout>
    )
}

export default Links

