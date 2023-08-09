import React from "react";
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import {doMarkdownHMR} from "@blog/_lib/fileWatch";

export type MarkdownOptions = Omit<MDXRemoteProps, 'source'>

export default React.memo(function ArticleRenderer(props: {
  toRender: string
  markdownOptions: MarkdownOptions
}) {
  // doMarkdownHMR() is called here to make sure that the HMR is working.
  // This file is edited automatically by markdown watcher script.
  // See also: watchMarkdown.js
  doMarkdownHMR()
  return (
    <MDXRemote
      source={props.toRender}
      {...props.markdownOptions}
    />
  )
})
