import * as React from 'react'

import { BlogPost } from '@trpfrog.net/posts'

export type IsomorphicArticlePartsProps = {
  content: string
  entry?: BlogPost
}

export type IsomorphicArticleParts =
  | ((props: IsomorphicArticlePartsProps) => React.ReactNode)
  | React.ExoticComponent<IsomorphicArticlePartsProps>

export type ArticleParts = {
  readonly name: string
  Component: IsomorphicArticleParts
  DevComponent?: IsomorphicArticleParts
}
