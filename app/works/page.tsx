import fs from 'fs/promises';

import Title from "../../components/Title";
import Block from "../../components/Block";
import styles from './style.module.scss';
import React from "react";
import Image from "next/legacy/image";
import {Metadata} from "next";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

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

export const metadata = {
  title: 'Works',
  description: 'つまみさんの作った作品・ソフトウェア・Webサイトのまとめページです。'
} satisfies Metadata

export default async function Index() {

  // load all md files under /app/works/contents/*.md
  const markdownFiles = await fs.readdir('app/works/contents')
  let contents = await Promise.all(
    markdownFiles.map(async (filename) => {
      const markdownString = await fs.readFile(`app/works/contents/${filename}`, 'utf-8')
      const matterResult = matter(markdownString)
      return {
        filename,
        metadata: matterResult.data,
        content: matterResult.content
      }
    })
  )
  contents = contents.sort((a, b) => {
    // sort by released date (a.metadata.released)
    const aDate = a.metadata.released?.split('/').map(Number) as [number, number, number]
    const bDate = b.metadata.released?.split('/').map(Number) as [number, number, number]
    if (aDate[0] !== bDate[0]) {
      return bDate[0] - aDate[0]
    }
    if (aDate[1] !== bDate[1]) {
      return bDate[1] - aDate[1]
    }
    return bDate[2] - aDate[2]
  });

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
              <b>Released:</b> {metadata.released}
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
