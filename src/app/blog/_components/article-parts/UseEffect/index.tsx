import { MarkdownUseEffect } from '@blog/_components/article-parts/UseEffect/MarkdownUseEffect'
import { ArticleParts } from '@blog/_components/ArticleParts'

export const markdownUseEffectParts = {
  name: 'use-effect',
  Component: async function InnerLinkEmbed({ content }) {
    return <MarkdownUseEffect code={content} />
  },
} as const satisfies ArticleParts
