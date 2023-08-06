import React from "react";
import ReactMarkdown from "react-markdown";
import {Options as ReactMarkdownOptions} from "react-markdown";

export default React.memo(function ArticleRenderer(props: {
  toRender: string
  markdownOptions: Partial<ReactMarkdownOptions>
}) {
  return (
    <ReactMarkdown {...props.markdownOptions}>
      {props.toRender}
    </ReactMarkdown>
  )
})
