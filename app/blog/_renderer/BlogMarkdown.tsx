import styles from "@blog/_styles/blog.module.scss";
import React, {CSSProperties} from "react";
import {BlogImageData} from "@blog/_lib/imagePropsFetcher";
import PageNavigation from "@blog/_components/PageNavigation";
import Block from "@/components/Block";

import {getMarkdownOptions, getMarkdownPlugins} from "./rendererProperties";
import ArticleRenderer from "./ArticleRenderer";
import BlogPost from "@blog/_lib/blogPost";
import {MDXRemote} from "next-mdx-remote/rsc";

export const parseInlineMarkdown = (markdown: string) => {
  return (
    <MDXRemote
      source={markdown}
      components={{
        p: ({children}) => <>{children}</>
      }}
      options={{
        mdxOptions: {
          ...getMarkdownPlugins(),
          format: 'md'
        }
      }}
    />
  )
}

type Props = {
  entry: BlogPost
  imageSize: { [path: string]: BlogImageData }
  style?: CSSProperties
  className?: string
}

const BlogMarkdown = React.memo(function InnerBlogMarkdown(props: Props) {
  const {entry, imageSize, style, className} = props
  const markdown = entry.content
  const mdOptions = getMarkdownOptions(entry, imageSize)

  return (
    <>
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
            <ArticleRenderer toRender={content} markdownOptions={mdOptions}/>
          </article>
          {idx === markdown.length - 1 &&
            <PageNavigation entry={entry}/>
          }
        </Block>
      ))}
    </>
  )
})

export default BlogMarkdown;
