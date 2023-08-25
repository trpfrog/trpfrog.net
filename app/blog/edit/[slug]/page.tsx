'use client';

import MainWrapper from "@/components/MainWrapper";
import styles from "./page.module.scss";
import Block from "@/components/Block";
import React from "react";
import Viewer from "@blog/edit/[slug]/Viewer";
import Editor from "@blog/edit/[slug]/Editor";
import {useMountEffect, useUnmountEffect} from "@react-hookz/web";
import {buildBlogPost} from "@blog/_lib/blogPost";
import useFullscreen from "@/hooks/useFullscreen";

export default function Index(props: { params: { slug: string } }) {

  const INITIAL_CONTENT = 'Loading...'
  const [post, setPost] = React.useState(INITIAL_CONTENT)
  const [pageIdx, setPageIdx] = React.useState(1)

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

  useFullscreen()

  const entry = buildBlogPost(post, {pagePos1Indexed: pageIdx})

  return (
    <MainWrapper className={styles.fullscreen}>
      {Array.from(Array(entry.numberOfPages), (_, k) => (
        <button onClick={() => setPageIdx(k + 1)} key={k + 1}>
          {k + 1}
        </button>
      ))}
      <div className={styles.editor_grid}>
        <Block className={styles.editor_block} style={{overflow: 'scroll'}}>
          <Editor rawMarkdown={post} setPost={setPost}/>
        </Block>
        <div style={{overflow: 'scroll'}}>
          <Viewer post={entry}/>
        </div>
      </div>
    </MainWrapper>
  );
}
