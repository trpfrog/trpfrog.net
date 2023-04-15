import BlogPost from "../../../lib/blog/blogPost";
import {BlogImageData} from "../../../lib/blog/imagePropsFetcher";
import React, {CSSProperties} from "react";
import {doMarkdownHMR} from "../../../lib/blog/fileWatch";
import BlogMarkdown from "./BlogMarkdown";

type Props = {
  entry: BlogPost
  imageSize: { [path: string]: BlogImageData }
  style?: CSSProperties
  className?: string
}

export default function DevBlogMarkdown ({entry, imageSize, style, className}: Props) {
  const markdown = entry.content

  const [post, setPost] = React.useState(entry)

  React.useEffect(() => {
    const f = async () => {
      const apiUrl = `/api/blog/posts/${entry.slug}/${entry.currentPage}`
      const res = await fetch(apiUrl)
      return await res.json()
    }
    f().then(r => setPost(r))
  }, [entry.currentPage, entry.slug])
  doMarkdownHMR()

  return (
    <BlogMarkdown entry={post} imageSize={imageSize} style={style} className={className}/>
  )
}
