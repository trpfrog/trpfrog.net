'use client';

import React, {useId, useState} from "react";
import ArticleRendererFromContext from "@blog/renderer/ArticleRenderer";
import {ArticleParts} from "../ArticleParts";

type Props = {
  children: React.ReactNode
  preview: React.ReactNode
  className?: string
}

export const ShowAllComponent = ({children, preview, className}: Props) => {
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
      {isShowAll ? (
        <div className={className}>
          {preview}
          {children}
        </div>
      ) : (
        <div style={{position: 'relative'}} className={className}>
          {preview}
          <Fog/>
        </div>
      )}
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
