import React from "react";
import ReactMarkdown from "react-markdown";
import {MathJaxWrapper} from "@/components/utils/MathJaxWrapper";
import {Options as ReactMarkdownOptions} from "react-markdown";

export default React.memo(function ArticleRenderer(props: {
  toRender: string
  markdownOptions: Partial<ReactMarkdownOptions>
}) {
  return (
    <MathJaxWrapper>
      <ReactMarkdown {...props.markdownOptions}>
        {props.toRender}
      </ReactMarkdown>
    </MathJaxWrapper>
  )
})
