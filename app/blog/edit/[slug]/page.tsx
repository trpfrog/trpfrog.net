'use client';

import MainWrapper from "@/components/MainWrapper";
import styles from "./page.module.scss";
import Block from "@/components/Block";
import React, {useDeferredValue, useMemo, useRef} from "react";
import Viewer from "@blog/edit/[slug]/Viewer";
import Editor from "@blog/edit/[slug]/Editor";
import {useMountEffect} from "@react-hookz/web";
import {buildBlogPost} from "@blog/_lib/blogPost";
import useFullscreen from "@/hooks/useFullscreen";
import useDisableScroll from "@/hooks/useDisableScroll";
const crypto = require('crypto')

function md5hex(str: string /*: string */) {
  const md5 = crypto.createHash('md5')
  return md5.update(str, 'binary').digest('hex')
}


export default function Index(props: { params: { slug: string } }) {

  const INITIAL_CONTENT = 'Loading...'
  const [post, setPost] = React.useState(INITIAL_CONTENT)
  const deferredPost = useDeferredValue(post)

  const [pageIdx, setPageIdx] = React.useState(1)
  const deferredPageIdx = useDeferredValue(pageIdx)

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

  useFullscreen()
  useDisableScroll()
  const scrollToTopRef = useRef<HTMLDivElement>(null)

  const deferredBlogPost = useMemo(() => (
    buildBlogPost(deferredPost, {pagePos1Indexed: deferredPageIdx})
  ), [deferredPageIdx, deferredPost])

  return (
    <MainWrapper className={styles.fullscreen}>
      <div className={styles.editor_grid}>
        <Block className={styles.editor_block} style={{overflow: 'scroll'}}>
          <Editor slug={props.params.slug} rawMarkdown={post} setPost={setPost}/>
        </Block>
        <div className={styles.viewer_wrapper} ref={scrollToTopRef}>
          <Viewer
            post={deferredBlogPost}
            setPageIdx={setPageIdx}
            scrollToTopRef={scrollToTopRef}
          />
        </div>
      </div>
    </MainWrapper>
  );
}
