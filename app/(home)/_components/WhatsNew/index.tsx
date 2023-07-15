import styles from "./index.module.scss";
import ReactMarkdown from "react-markdown";
import Block from "@/components/Block";
import React from "react";
import path from "path";
import fs from "fs";
import {getSortedPostsData} from "@blog/_lib/load";
import dayjs from "dayjs";

type Props = {
  id?: string
}

type WhatsNewRecord = {
  type: 'page' | 'fix' | 'improve' | 'blog' | 'content',
  text: string,
  date: string
}

const getWhatsNewRecords: () => Promise<WhatsNewRecord[]> = async () => {
  const jsonPath = path.join(process.cwd(), 'data', 'whats_new.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const records = JSON.parse(jsonText) as WhatsNewRecord[];

  const blogData = await getSortedPostsData()

  for (const post of blogData) {
    records.push({
      type: 'blog',
      text: `記事「[${post.title}](https://trpfrog.net/blog/${post.slug})」を公開しました！`,
      date: dayjs(post.date).format('YYYY-MM-DD')
    })
  }

  return records.sort((a, b) => {
    if (a.date === b.date) return 0
    return a.date < b.date ? 1 : -1
  })
}


export default async function WhatsNew ({id}: Props) {
  const whatsNewRecords: WhatsNewRecord[] = await getWhatsNewRecords()
  return (
    <Block title={'最新情報'} h2icon={'robot'} id={id}>
      <div id={styles.whats_new_table}>
        {whatsNewRecords.map(({text, date}) => {
          const [y, m, d] = date.split('-')
          if (process.env.NODE_ENV !== 'production') {
            const localhost = 'http://localhost:3000'
            text = text.replace(/https:\/\/trpfrog.net/g, localhost)
          }
          return (
            <div key={text} className={styles.whats_new_row}>
              <div className={styles.whats_new_date}>{y}-<br/>{m}-{d}</div>
              <div><ReactMarkdown>{text}</ReactMarkdown></div>
            </div>
          )
        })}
      </div>
    </Block>
  )
}
