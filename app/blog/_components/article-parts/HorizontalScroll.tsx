import React from "react";
import ArticleRenderer from "@blog/_renderer/ArticleRenderer";
import {ArticleParts} from "../ArticleParts";

const HorizontalScroll: ArticleParts = ({content, mdOptions}) => {
  const contents = content.split('\n\n').filter(e => e.trim() !== '')
  return (
    <div style={{display: 'flex', overflowX: 'scroll', gap: '1em', whiteSpace: 'nowrap'}}>
      {contents.map((e, idx) => (
        <div
          key={'horizontal-element-key-' + idx}
          style={{display: 'inline-block', whiteSpace: 'initial'}}
        >
          <ArticleRenderer toRender={e} markdownOptions={mdOptions}/>
        </div>
      ))}
    </div>
  )
}

export default HorizontalScroll
