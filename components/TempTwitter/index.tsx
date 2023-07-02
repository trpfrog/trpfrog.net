import microCMS from "../../lib/microCMS";
import matter from "gray-matter";
import React from "react";
import {Suspense} from "react";
import LoadingBlock from "../LoadingBlock";
import ReactMarkdown from "react-markdown";
import MainWrapper from "../common/server/MainWrapper";
import Block from "../Block";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {ShowAllComponent} from "../blog/article-parts/ShowAll";
import styles from './index.module.scss'

export default async function TempTwitter() {
  let md: string
  let frontMatter: { [key: string]: any }
  try {
    const data = await microCMS.get({
      endpoint: "blog-preview",
      contentId: process.env.TEMP_TWITTER_CONTENT_ID!,
    })
    const result = matter(data?.md)
    md = result.content
    frontMatter = result.data
  } catch (e) {
    return <></>
  }

  if ((frontMatter.useTempTwitter + '').trim() !== 'true') {
    return <></>
  }

  const tweets = md.split('\n').filter(Boolean).reverse().map((line, idx) => {
    const [date, ...contentArr] = line.split('---')
    const content = contentArr.join('---')
    return (
      <React.Fragment key={`temp-twitter-${idx}`}>
        <b style={{
          display: 'inline-block',
          opacity: idx === 0 ? 1 : 0.7,
          whiteSpace: 'nowrap',
        }}>
          {date}
        </b>
        <div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              p: ({children}: any) => <>{children}</>
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </React.Fragment>
    )
  })

  const maxTweetsDisplayedAtOnce = 5

  return (
    <MainWrapper>
      <Block title={'Twitter 一時避難所'}>
        <p>
          なんらかの原因でツイートできなくなったときに逃げてくる場所です。
        </p>
        <Suspense fallback={<LoadingBlock style={{height: 300}}/>}>
          {tweets.length > maxTweetsDisplayedAtOnce ? (
            <ShowAllComponent preview={
              tweets.slice(0, maxTweetsDisplayedAtOnce)
            } className={styles.grid}>
              {tweets.slice(maxTweetsDisplayedAtOnce)}
            </ShowAllComponent>
          ) : (
            <div className={styles.grid}>
              tweets
            </div>
          )}
        </Suspense>
      </Block>
    </MainWrapper>
  )
}
