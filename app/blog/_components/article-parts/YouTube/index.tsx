import {InnerAutoYouTube, InnerYouTube} from "@blog/_components/article-parts/YouTube/InnerYouTube";
import {ServerArticlePartsProps} from "@blog/_components/ArticleParts";

export function YouTube(props: ServerArticlePartsProps) {
  return <InnerYouTube content={props.content}/>
}

export function AutoYouTube(props: ServerArticlePartsProps) {
  return <InnerAutoYouTube content={props.content}/>
}
