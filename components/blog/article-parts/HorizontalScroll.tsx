import React from "react";
import {ArticleParts} from "../../../lib/blog/articleParts";
import ArticleRendererFromContext from "../../../app/blog/ArticleRenderer";

const HorizontalScroll: ArticleParts = (content) => {
  const contents = content.split('\n\n').filter(e => e.trim() !== '')
  return (
    <div style={{display: 'flex', overflowX: 'scroll', gap: '1em', whiteSpace: 'nowrap'}}>
      {contents.map((e, idx) => (
        <div
          key={'horizontal-element-key-' + idx}
          style={{display: 'inline-block', whiteSpace: 'initial'}}
        >
          <ArticleRendererFromContext toRender={e} />
        </div>
      ))}
    </div>
  )
}

export default HorizontalScroll
