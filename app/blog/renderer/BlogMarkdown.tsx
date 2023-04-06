'use client';

import styles from "../../../styles/blog/blog.module.scss";
import React, {CSSProperties} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {BlogImageData} from "../../../lib/blog/imagePropsFetcher";
import PageNavigation from "../../../components/blog/PageNavigation";
import Block from "../../../components/Block";

import RendererProvider from "./RendererProvider";
import ArticleRendererFromContext from "./ArticleRenderer";
import BlogPost from "../../../lib/blog/blogPost";
import {doMarkdownHMR} from "../../../lib/blog/fileWatch";

export const parseInlineMarkdown = (markdown: string) => {
  const comp = {
    p: ({children}: any) => <>{children}</>
  }
  return <ReactMarkdown
    components={comp}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}>
    {markdown}
  </ReactMarkdown>
}

type Props = {
  entry: BlogPost
  imageSize: { [path: string]: BlogImageData }
  style?: CSSProperties
  className?: string
}

const BlogMarkdown = ({entry, imageSize, style, className}: Props) => {
  const markdown = entry.content

  const [post, setPost] = React.useState(entry)

  // This code is used to reload page automatically on some changes appeared on md files
  if (process.env.NODE_ENV !== 'production') {
    // For development, fetch article data from api
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      const f = async () => {
        const apiUrl = `/api/blog/posts/${entry.slug}/${entry.currentPage}`
        const res = await fetch(apiUrl)
        return await res.json()
      }
      f().then(r => setPost(r))
    }, [])
    doMarkdownHMR()
  }

  return (
    <RendererProvider entry={post} imageSize={imageSize}>
      {markdown.map((content, idx) => (
        <Block key={'window-' + idx} style={style} className={className}>
          {idx === 0 &&
            <>
              <span id={'article'}/>
              <PageNavigation entry={post} doNotShowOnFirst={true}/>
            </>
          }
          <article
            className={styles.post}
            style={{wordBreak: 'break-word'}}
          >
            <ArticleRendererFromContext toRender={content}/>
          </article>
          {idx === markdown.length - 1 &&
            <PageNavigation entry={post}/>
          }
        </Block>
      ))}
    </RendererProvider>
  )
}

export default BlogMarkdown;
