'use client'

import BlogPost from "@blog/_lib/blogPost";
import {BlogImageData} from "@blog/_lib/imagePropsFetcher";
import React, {CSSProperties, useState, useTransition} from "react";
import {doMarkdownHMR} from "@blog/_lib/fileWatch";
import BlogMarkdown from "./BlogMarkdown";

type Props = {
  entry: BlogPost
  imageSize: { [path: string]: BlogImageData }
  style?: CSSProperties
  className?: string
}

export default function DevBlogMarkdown ({entry, imageSize, style, className}: Props) {
  const [post, setPost] = useState(entry)
  const [_, startTransition] = useTransition()

  React.useEffect(() => {
    const f = async () => {
      const apiUrl = `/api/blog/posts/${entry.slug}/${entry.currentPage}`
      const res = await fetch(apiUrl)
      const json = await res.json()
      console.log(json)
      return json
    }
    f().then(r => startTransition(() => setPost(r)))
  }, [entry.currentPage, entry.slug])

  // doMarkdownHMR() is called here to make sure that the HMR is working.
  // This file is edited automatically by markdown watcher script.
  // See also: watchMarkdown.js
  doMarkdownHMR()

  return (
    <BlogMarkdown entry={post} imageSize={imageSize} style={style} className={className}/>
  )
}
