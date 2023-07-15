'use client'

import BlogPost from "@blog/lib/blogPost";
import {BlogImageData} from "@blog/lib/imagePropsFetcher";
import React, {CSSProperties} from "react";
import {doMarkdownHMR} from "@blog/lib/fileWatch";
import BlogMarkdown from "./BlogMarkdown";

type Props = {
  entry: BlogPost
  imageSize: { [path: string]: BlogImageData }
  style?: CSSProperties
  className?: string
}

export default function DevBlogMarkdown ({entry, imageSize, style, className}: Props) {
  const [post, setPost] = React.useState(entry)

  React.useEffect(() => {
    const f = async () => {
      const apiUrl = `/api/blog/posts/${entry.slug}/${entry.currentPage}`
      const res = await fetch(apiUrl)
      const json = await res.json()
      console.log(json)
      return json
    }
    f().then(r => setPost(r))
  }, [doMarkdownHMR])

  // doMarkdownHMR() is called here to make sure that the HMR is working.
  // This file is edited automatically by markdown watcher script.
  // See also: watchMarkdown.js
  doMarkdownHMR()

  return (
    <BlogMarkdown entry={post} imageSize={imageSize} style={style} className={className}/>
  )
}
