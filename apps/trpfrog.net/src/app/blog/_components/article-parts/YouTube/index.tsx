import {
  InnerAutoYouTube,
  InnerYouTube,
} from '@blog/_components/article-parts/YouTube/InnerYouTube'
import { ArticleParts } from '@blog/_components/ArticleParts'

export const youTubeParts = {
  name: 'youtube',
  Component: ({ content }) => <InnerYouTube content={content} />,
} as const satisfies ArticleParts

export const autoYouTubeParts = {
  name: 'auto-youtube',
  Component: ({ content }) => <InnerAutoYouTube content={content} />,
} as const satisfies ArticleParts
