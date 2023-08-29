import BlogPost from "@blog/_lib/blogPost";
import React from "react";
import Title from "@/components/Title";
import styles from "./index.module.scss";
import Balancer from "react-wrap-balancer";
import {ParseWithBudouX} from "@/lib/wordSplit";
import PostAttributes from "@blog/_components/PostAttributes";
import Tag from "@blog/_components/Tag";
import {EntryButtons} from "@blog/[slug]/[[...options]]/_components/EntryButtons";
import EditButton from "@blog/[slug]/[[...options]]/_components/EditButton";

type Props = Omit<React.ComponentProps<'div'>, 'children'> & {
  post: BlogPost
  addEntryButtons?: boolean
  addEditButtonOnDevMode?: boolean
}

export default React.memo(function ArticleHeader(props: Props) {

  const {
    post,
    addEntryButtons = true,
    addEditButtonOnDevMode = true,
    className = '',
    style = {},
    ...rest
  } = props

  const tags = post.tags
    .split(',')
    .map((tag: string) => tag.trim())

  return (
    <>
      <Title
        className={`${styles.article_title_block} ${className}`}
        style={{
          backgroundImage: post.thumbnail ? `url(${post.thumbnail})` : undefined,
          ...style
        }}
        {...rest}
      >
        <div
          className={styles.inner_title_block}
          data-parent-has-thumbnail={!!post.thumbnail}
        >
          <h1>
            <Balancer>
              <ParseWithBudouX str={
                (() => {
                  if (post.title?.endsWith('！')) {
                    return post.title.slice(0, post.title.length - 1) + ' !'
                  } else {
                    return post.title
                  }
                })()
              } slug={post.slug} />
            </Balancer>
          </h1>
          <p style={{margin: '1em'}}>{post.description}</p>
          <PostAttributes post={post}/>

          {/* Tags */}
          <p>
            {tags.map((tag: string) => (
              <span
                style={{
                  margin: '3px 3px 0 0',
                  display: 'inline-block'
                }}
                key={tag}
              >
                <Tag tag={tag}/>
              </span>
            ))}
          </p>
          {/*<div id={styles.entry_top_buttons}>*/}
          {/*  <RichEntryButtons post={post} extended={true}/>*/}
          {/*</div>*/}
          {process.env.NODE_ENV === 'development' && addEditButtonOnDevMode &&
            <p>
              <EditButton slug={post.slug}/>
            </p>
          }
          {/*<BadBlogButton/>*/}
        </div>
      </Title>
      {addEntryButtons && <EntryButtons post={post} style={{margin: 0}}/>}
    </>
  )
})
