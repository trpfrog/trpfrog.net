import fs from 'fs'
import path from 'path'

import dayjs from 'dayjs'
import ReactMarkdown from 'react-markdown'

import { HoverScrollBox } from '@/components/atoms/HoverScrollBox'
import { Block } from '@/components/molecules/Block'

import { retrieveSortedBlogPostList } from '@blog/_lib/load'

import styles from './index.module.scss'

type Props = {
  id?: string
}

type WhatsNewRecord = {
  type: 'page' | 'fix' | 'improve' | 'blog' | 'content'
  text: string
  date: string
}

const getWhatsNewRecords: () => Promise<WhatsNewRecord[]> = async () => {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'whats_new.json')
  const jsonText = fs.readFileSync(jsonPath, 'utf-8')
  const records = JSON.parse(jsonText) as WhatsNewRecord[]

  const blogData = await retrieveSortedBlogPostList()

  for (const post of blogData) {
    records.push({
      type: 'blog',
      text: `記事「[${post.title}](https://trpfrog.net/blog/${post.slug})」を公開しました！`,
      date: dayjs(post.date).format('YYYY-MM-DD'),
    })
  }

  return records.sort((a, b) => {
    if (a.date === b.date) return 0
    return a.date < b.date ? 1 : -1
  })
}

export async function WhatsNew({ id }: Props) {
  const whatsNewRecords: WhatsNewRecord[] = await getWhatsNewRecords()
  return (
    <Block title={'最新情報'} h2icon={'robot'} id={id} className={styles.block}>
      <div className={styles.table_wrapper}>
        <HoverScrollBox id={styles.whats_new_table}>
          {whatsNewRecords.map(({ text, date }) => {
            const [y, m, d] = date.split('-')
            if (process.env.NODE_ENV !== 'production') {
              const localhost = 'http://localhost:3000'
              text = text.replace(/https:\/\/trpfrog.net/g, localhost)
            }
            return (
              <div key={text} className={styles.whats_new_row}>
                <div className={styles.whats_new_date}>
                  {y}-<br />
                  {m}-{d}
                </div>
                <div>
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
              </div>
            )
          })}
        </HoverScrollBox>
      </div>
    </Block>
  )
}
