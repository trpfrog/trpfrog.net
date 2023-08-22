'use client';

import MainWrapper from "@/components/MainWrapper";
import styles from "./page.module.scss";
import Block from "@/components/Block";
import React, {useEffect} from "react";
import Viewer from "@blog/edit/[slug]/Viewer";
import Editor from "@blog/edit/[slug]/Editor";
import {useMountEffect, useUnmountEffect} from "@react-hookz/web";

export default function Index(props: { params: { slug: string } }) {

  const INITIAL_CONTENT = 'Loading...'
  const [post, setPost] = React.useState(INITIAL_CONTENT)

  useMountEffect(() => {
    console.log('fire')
    fetch(`/blog/edit/${props.params.slug}/api`, {
      headers: {
        'x-blog-slug': props.params.slug,
      }
    })
      .then(res => res.text())
      .then(text => setPost(text))
      .catch(console.error)
  })

  useUnmountEffect(() => {
    if (post === INITIAL_CONTENT) return
    void fetch(`/blog/edit/${props.params.slug}/api`, {
      method: 'POST',
      headers: {
        'x-blog-slug': props.params.slug,
      },
      body: post,
    })
  })

  return (
    <MainWrapper style={{maxWidth: '100%'}}>
      {/*<ArticleHeader post={post}/>*/}
      <div className={styles.editor_grid}>
        <Block className={styles.editor_block}>
          <Editor rawMarkdown={post} setPost={setPost}/>
        </Block>
        <Viewer rawMarkdown={post}/>
      </div>
    </MainWrapper>
  );
}
