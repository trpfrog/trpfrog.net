import type {NextPage} from 'next'
import {getMutualLinkRecords, MutualLinkRecord} from "../lib/MutualLinks";
import {GetStaticProps} from "next";

import styles from "../styles/top-page/main.module.scss";

import Link from "next/link";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";
import React from "react";
import Utils from "../lib/utils";

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
      <Title title={'相互リンク'} description={'オタク各位のWebサイトです。'}>
        <p>
                    順番はハンドルネームをUTF-8でソートしたもの。
          <s>片想いリンクになったやつもある</s>
        </p>
      </Title>
      <Block>
        <div className={styles.link_grid}>
          {mutualLinks.map(({ url, siteName, ownerName, twitterId, description }) => {

            // Shrink siteName if its length too long
            const style = Utils.calcMonospacedTextWidth(siteName) < 20 ? {} : {
              letterSpacing: -0.5
            } as React.CSSProperties

            return (
              <div key={siteName} className={styles.link_block}>
                <p style={{textAlign: "center"}}>
                  <Link href={url} className="linkButton" style={style}>

                    {siteName}

                  </Link>
                </p>
                <p>
                  <b><Link href={`https://twitter.com/${twitterId}/`}>
                    {ownerName}
                  </Link></b>さんのHP
                </p>
                <p>
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </Block>
    </Layout>
  );
}

export default Links

