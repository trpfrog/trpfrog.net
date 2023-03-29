'use client';

import React, {useState} from "react";
import ArticleRendererFromContext from "../../../app/blog/renderer/ArticleRenderer";
import {ArticleParts} from "../ArticleParts";


const ShowAll: ArticleParts = (content, entry, imageSize) => {
  const [first, second] = content.split(/\n---+\n/)

  const [isShowAll, setShowAll] = useState(false)

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

  return (
    <div>
      <div style={{position: 'relative'}}>
        <ArticleRendererFromContext toRender={first}/>
        {!isShowAll && <Fog/>}
      </div>
      {isShowAll &&
        <ArticleRendererFromContext toRender={second}/>
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
export default ShowAll
