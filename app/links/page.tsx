import {loadMutualLinkRecords, MutualLinkRecord} from "../../lib/MutualLinks";

import styles from "../style.module.scss";

import Title from "../../components/Title";
import Block from "../../components/Block";
import React from "react";
import Utils from "../../lib/utils";
import {Metadata} from "next";

function MutualLinkBlock (props: {
  record: MutualLinkRecord
  key?: string
}) {
  const {
    record: {url, siteName, ownerName, twitterId, description},
    key
  } = props

  // Shrink siteName if its length too long
  const style = Utils.calcMonospacedTextWidth(siteName) < 20 ? {} : {
    letterSpacing: -0.5
  } as React.CSSProperties

  return (
    <div key={key} className={styles.link_block}>
      <p style={{textAlign: "center"}}>
        <a
          href={url}
          className="linkButton"
          style={style}
          target="_blank"
          rel="noreferrer noopener"
        >
          {siteName}
        </a>
      </p>
      <p>
        <a
          href={`https://twitter.com/${twitterId}/`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <b>{ownerName}</b>
        </a>
        さんのHP
      </p>
      <p>
        {description}
      </p>
    </div>
  );
}

export const metadata = {
  title: '相互リンク',
  description: 'オタク各位のWebサイトです。'
} satisfies Metadata

export default async function Index() {
  const mutualLinks: MutualLinkRecord[] = await loadMutualLinkRecords();
  return (
    <div id="main_wrapper">
      <Title title={metadata.title} description={metadata.description}>
        <p>
          順番はハンドルネームをUTF-8でソートしたもの。
          <s>片想いリンクになったやつもある</s>
        </p>
      </Title>
      <Block>
        <div className={styles.link_grid}>
          {mutualLinks.map((record) => (
            <MutualLinkBlock
              record={record}
              key={record.url}
            />
          ))}
        </div>
      </Block>
    </div>
  );
}


