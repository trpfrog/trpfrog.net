'use client';

import BlogMarkdown from "@blog/_renderer/BlogMarkdown";
import React from "react";
import styles from "@blog/edit/[slug]/page.module.scss";
import {buildBlogPost} from "@blog/_lib/blogPost";

export default React.memo(function Viewer(props: { rawMarkdown: string }) {
  const post = buildBlogPost(props.rawMarkdown, {all: true})
  return (
    <BlogMarkdown entry={post} imageSize={{}} className={styles.blog_markdown}/>
  )
})
