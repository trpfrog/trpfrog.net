import styles from "../../../styles/blog/blog.module.scss";
import React, {CSSProperties} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {BlogPost} from "../../../lib/blog/load";
import {BlogImageData} from "../../../lib/blog/imagePropsFetcher";
import PageNavigation from "../../../components/blog/PageNavigation";
import Block from "../../../components/Block";

import {MathJaxWrapper} from "../../../components/utils/MathJaxWrapper";
import {RendererProvider} from "../RendererContext";
import ArticleRendererFromContext from "../ArticleRenderer";

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

export const getPureCloudinaryPath = (path: string) => {
  const cloudinaryUrl = 'https:\/\/res.cloudinary.com\/trpfrog'
  return (path ?? '')
    .replace(/\/image\/upload\/v[0-9]+/, '')
    .replace(/\/image\/upload/, '')
    .replace(cloudinaryUrl, '')
    .split('.')[0] // remove extension
}

type Props = {
  entry: BlogPost
  imageSize: { [path: string]: BlogImageData }
  style?: CSSProperties
  className?: string
}

const BlogMarkdown = ({entry, imageSize, style, className}: Props) => {
  const markdown = entry.content
  return (
    <RendererProvider entry={entry} imageSize={imageSize}>
      {markdown.map((content, idx) => (
        <Block key={'window-' + idx} style={style} className={className}>
          {idx === 0 &&
            <>
              <span id={'article'}/>
              <PageNavigation entry={entry} doNotShowOnFirst={true}/>
            </>
          }
          <article
            className={styles.post}
            style={{wordBreak: 'break-word'}}
          >
            <MathJaxWrapper>
              <ArticleRendererFromContext toRender={content}/>
            </MathJaxWrapper>
          </article>
          {idx === markdown.length - 1 &&
            <PageNavigation entry={entry}/>
          }
        </Block>
      ))}
    </RendererProvider>
  )
}

export default BlogMarkdown;
