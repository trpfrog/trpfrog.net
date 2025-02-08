import { parseTitleAndBody } from '@trpfrog.net/posts/parser'

import { LazyDetails } from '@/components/atoms/Details/lazy'

import { CustomCodeBlockComponent } from '../types'

export const detailsCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    const { title, body } = parseTitleAndBody(markdown)
    return (
      <LazyDetails summary={title}>
        <Render markdown={body} />
      </LazyDetails>
    )
  },
}
