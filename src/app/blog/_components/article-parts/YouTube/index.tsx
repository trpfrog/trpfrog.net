import {
  InnerAutoYouTube,
  InnerYouTube,
} from '@/app/blog/_components/article-parts/YouTube/InnerYouTube'
import { IsomorphicArticlePartsProps } from '@/app/blog/_components/ArticleParts'

export function YouTube(props: IsomorphicArticlePartsProps) {
  return <InnerYouTube content={props.content} />
}

export function AutoYouTube(props: IsomorphicArticlePartsProps) {
  return <InnerAutoYouTube content={props.content} />
}
