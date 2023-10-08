import React from 'react'

import { ShowAllComponent } from '@blog/_components/article-parts/ShowAll/ShowAllComponent'
import { ArticleParts } from '@blog/_components/ArticleParts'
import { ArticleRenderer } from '@blog/_renderer/ArticleRenderer'

export const showAllParts = {
  name: 'show-all',
  Component: ({ content, entry, imageSize }) => {
    const [first, second] = content.split(/\n---+\n/)
    return (
      <ShowAllComponent
        preview={
          <ArticleRenderer
            toRender={first}
            entry={entry}
            imageSize={imageSize}
          />
        }
      >
        <ArticleRenderer
          toRender={second}
          entry={entry}
          imageSize={imageSize}
        />
      </ShowAllComponent>
    )
  },
} as const satisfies ArticleParts
