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
      <li key={`temp-twitter-${idx}`}>
        <div style={{display: 'flex', gap: 10}}>
          <b style={{
            display: 'inline-block',
            opacity: idx === 0 ? 1 : 0.7,
            whiteSpace: 'nowrap',
          }}>
            {date}
          </b>
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
      </li>
    )
  })

  const TweetsUL = ({children}: {children: React.ReactNode}) => (
    <ul style={{paddingLeft: 0}}>
      {children}
    </ul>
  )

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
              <TweetsUL>
                {tweets.slice(0, maxTweetsDisplayedAtOnce)}
              </TweetsUL>
            }>
              <TweetsUL>
                {tweets.slice(maxTweetsDisplayedAtOnce)}
              </TweetsUL>
            </ShowAllComponent>
          ) : (
            <TweetsUL>
              {tweets}
            </TweetsUL>
          )}
        </Suspense>
      </Block>
    </MainWrapper>
  )
}
