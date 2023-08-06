import React from "react";
import ReactMarkdown from "react-markdown";
import {Options as ReactMarkdownOptions} from "react-markdown";
import {doMarkdownHMR} from "@blog/_lib/fileWatch";

export default React.memo(function ArticleRenderer(props: {
  toRender: string
  markdownOptions: Partial<ReactMarkdownOptions>
}) {
  // doMarkdownHMR() is called here to make sure that the HMR is working.
  // This file is edited automatically by markdown watcher script.
  // See also: watchMarkdown.js
  doMarkdownHMR()
  return (
    <ReactMarkdown {...props.markdownOptions}>
      {props.toRender}
    </ReactMarkdown>
  )
})
