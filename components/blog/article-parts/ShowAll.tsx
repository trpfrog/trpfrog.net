'use client';

import {ArticleRenderer, parseInlineMarkdown} from "../../../app/blog/[...slug]/BlogMarkdown";
import React, {useState} from "react";
import {ArticleParts} from "../../../lib/blog/articleParts";


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
        <ArticleRenderer
          toRender={first}
          entry={entry}
          imageSize={imageSize}
          renderLaTeX={false}
        />
        {!isShowAll && <Fog/>}
      </div>
      {isShowAll &&
        <ArticleRenderer
          toRender={second}
          entry={entry}
          imageSize={imageSize}
          renderLaTeX={false}
        />
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
