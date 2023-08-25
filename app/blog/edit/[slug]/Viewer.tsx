'use client';

import BlogMarkdown from "@blog/_renderer/BlogMarkdown";
import React from "react";
import styles from "@blog/edit/[slug]/page.module.scss";
import BlogPost from "@blog/_lib/blogPost";

export default React.memo(function Viewer(props: { post: BlogPost }) {
  return (
    <BlogMarkdown entry={props.post} imageSize={{}} className={styles.blog_markdown}/>
  )
})
