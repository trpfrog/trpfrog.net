import type {NextPage} from 'next'
import Link from "next/link";
import Image from "next/legacy/image";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Block from "../../components/Block";
import styles from "../../styles/stickers.module.scss";
import {NextSeo} from "next-seo";

const Index: NextPage = () => {
    return (
        <Layout>
            <NextSeo description={'つまみアイコン集'}/>
            <Title title={'アイコン集'}>
                <p>
                    つまみちゃんの作ったアイコンです。クリックで高解像度版に飛びます。
                </p>
            </Title>
            <Block>
                <div className={styles.icon_grid}>
                    {Array.from(Array(33), (v, k) => k).map(i => (
                        <Link href={'/icons/' + i} key={i}>
                            <a>
                                <Image
                                    src={'icons_gallery/' + i}
                                    width={100}
                                    height={100}
                                    objectFit={'contain'}
                                    quality={15}
                                    alt={i + '番目のスタンプ画像'}
                                />
                            </a>
                        </Link>
                    ))}
                </div>
            </Block>
        </Layout>
    )
}

export default Index

