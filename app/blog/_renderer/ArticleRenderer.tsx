import React from "react";
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import {doMarkdownHMR} from "@blog/_lib/fileWatch";
import BlogPost from "@blog/_lib/blogPost";
import {BlogImageData} from "@blog/_lib/imagePropsFetcher";
import {getMarkdownOptions} from "@blog/_renderer/rendererProperties";

export type MarkdownOptions = Omit<MDXRemoteProps, 'source'>

export type ArticleRendererProps = {
  toRender: string
  markdownOptions: MarkdownOptions
} | {
  toRender: string
  entry?: BlogPost
  imageSize?: Record<string, BlogImageData>
}

export default React.memo(function ArticleRenderer(props: ArticleRendererProps) {
  // doMarkdownHMR() is called here to make sure that the HMR is working.
  // This file is edited automatically by markdown watcher script.
  // See also: watchMarkdown.js
  doMarkdownHMR()

  let options: MarkdownOptions
  if ('markdownOptions' in props) {
    options = props.markdownOptions
  } else {
    options = getMarkdownOptions(props.entry, props.imageSize)
  }

  return (
    <MDXRemote
      source={props.toRender}
      {...options}
    />
  )
})
