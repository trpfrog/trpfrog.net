'use client';

import React, {useContext} from "react";
import ReactMarkdown from "react-markdown";
import RendererContext from "./RendererContext";
import {MathJaxWrapper} from "@/components/utils/MathJaxWrapper";

export default function ArticleRendererFromContext ({toRender}: {
  toRender: string,
}) {
  const context = useContext(RendererContext);
  return (
    <>
      <MathJaxWrapper>
        <ReactMarkdown {...context.markdown.options as any}>
          {toRender}
        </ReactMarkdown>
      </MathJaxWrapper>
    </>
  )
}
