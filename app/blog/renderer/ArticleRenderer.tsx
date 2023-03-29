'use client';

import React, {useContext} from "react";
import ReactMarkdown from "react-markdown";
import RendererContext from "./RendererContext";

export default function ArticleRendererFromContext ({toRender}: {
  toRender: string,
}) {
  const options = useContext(RendererContext);
  return (
    <ReactMarkdown {...options}>
      {toRender}
    </ReactMarkdown>
  )
}
