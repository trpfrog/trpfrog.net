import { parseTitleAndBody } from '@trpfrog.net/posts/parser'

import { Details } from '@/components/atoms/Details'

import { CustomCodeBlockComponent } from '../types'

export const detailsCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    const { title, body } = parseTitleAndBody(markdown)
    return (
      <Details summary={title} lazy>
        <Render markdown={body} />
      </Details>
    )
  },
}
