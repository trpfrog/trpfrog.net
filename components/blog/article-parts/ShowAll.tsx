'use client';

import React, {useId, useState} from "react";
import ArticleRendererFromContext from "../../../app/blog/renderer/ArticleRenderer";
import {ArticleParts} from "../ArticleParts";

export const ShowAllComponent = ({children, preview}: {children: React.ReactNode, preview: React.ReactNode}) => {
  const Fog = () => (
    <div style={{
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      bottom: 0,
      background: 'linear-gradient(transparent, var(--window-bkg-color))',
      width: '100%',
      height: 'min(60%, 400px)'
    }}/>
  )

  const [isShowAll, setShowAll] = useState(false)

  return (
    <div>
      <div style={{position: 'relative'}}>
        {preview}
        {!isShowAll && <Fog/>}
      </div>
      {isShowAll &&
        children
      }
      <div style={{textAlign: 'center', position: 'sticky', bottom: 10}}>
        <div
          style={{
            cursor: 'pointer',
            opacity: 0.7,
            border: 'var(--base-font-color) 2px solid',
            borderRadius: 10000,
            width: 'fit-content',
            display: 'inline-block',
            padding: '.2rem 1rem',
            fontWeight: 'bold'
          }}
          onClick={() => setShowAll(!isShowAll)}
        >
          {isShowAll ? '折りたたむ' : '続きを読む'}
        </div>
      </div>
    </div>
  )

}

const ShowAll: ArticleParts = (content, entry, imageSize) => {
  const [first, second] = content.split(/\n---+\n/)
  return (
    <ShowAllComponent preview={<ArticleRendererFromContext toRender={first}/>}>
      <ArticleRendererFromContext toRender={second}/>
    </ShowAllComponent>
  )
}


export default ShowAll
