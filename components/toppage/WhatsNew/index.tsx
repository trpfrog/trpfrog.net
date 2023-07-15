import styles from "./index.module.scss";
import ReactMarkdown from "react-markdown";
import Block from "@/components/Block";
import {getWhatsNewRecords, WhatsNewRecord} from "@/lib/whats_new";
import React from "react";

type Props = {
  id?: string
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
