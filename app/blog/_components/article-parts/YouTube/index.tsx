import {
  InnerAutoYouTube,
  InnerYouTube,
} from '@blog/_components/article-parts/YouTube/InnerYouTube'
import { IsomorphicArticlePartsProps } from '@blog/_components/ArticleParts'

export function YouTube(props: IsomorphicArticlePartsProps) {
  return <InnerYouTube content={props.content} />
}

export function AutoYouTube(props: IsomorphicArticlePartsProps) {
  return <InnerAutoYouTube content={props.content} />
}
