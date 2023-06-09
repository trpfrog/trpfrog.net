import fs from 'fs/promises';

import Title from "../../components/Title";
import Block from "../../components/Block";
import styles from './style.module.scss';
import React from "react";
import Image from "next/legacy/image";
import {Metadata} from "next";
import ReactMarkdown from "react-markdown";
import readMarkdowns from "../../lib/mdLoader";
import path from "path";

type KeywordsType = {
  keywords: string[]
}

const Keywords: React.FC<KeywordsType> = ({keywords}) => {
  return (
    <p className={styles.keywords}>
      <span className={styles.keyword_title}>TECHNOLOGIES</span><br/>
      {keywords.map(k =>
        <span key={k} className={styles.keyword}>{k}</span>
      )}
    </p>
  );
}

type Frontmatter = {
  title: string
  h2icon?: string
  image?: {
    path: string
    width: number
    height: number
  }
  keywords?: string[]
  links?: {
    [key: string]: string
  }
  date: `${number}/${number}/${number}`
}

export const metadata = {
  title: 'Works',
  description: 'つまみさんの作った作品・ソフトウェア・Webサイトのまとめページです。'
} satisfies Metadata

export default async function Index() {

  // load all md files under /app/works/contents/*.md
  const contents = await readMarkdowns<Frontmatter>(path.join('app', 'works', 'contents'))

  return (
    <div id="main_wrapper">
      <Title
        title={metadata.title}
        description={metadata.description}
      >
        <p>
          最終更新: 2023/5/31
        </p>
      </Title>

      {contents.map(({metadata, content}) => {
        return (
          <Block
            key={metadata.title}
            title={metadata.title}
            h2icon={metadata.h2icon}
          >
            {metadata.image && (
              <div className={styles.hero_image}>
                <Image
                  src={metadata.image?.path}
                  width={metadata.image?.width}
                  height={metadata.image?.height}
                  objectFit={'cover'}
                  alt={metadata.title + 'の画像'}
                />
              </div>
            )}
            {metadata.keywords && <Keywords keywords={metadata.keywords}/>}
            <p>
              <b>Released:</b> {metadata.date}
            </p>
            <ReactMarkdown>{content}</ReactMarkdown>
            <p className={'link-area'}>
              {Object.entries(metadata.links ?? {}).map(([linkTxt, url]) => {
                return (
                  <a
                    key={linkTxt}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkTxt}
                  </a>
                )
              })}
            </p>
          </Block>
        )
      })}
    </div>
  )
}
