import {InnerAutoYouTube, InnerYouTube} from "@blog/_components/article-parts/YouTube/InnerYouTube";
import {ArticlePartsProps} from "@blog/_components/ArticleParts";

export function YouTube(props: ArticlePartsProps) {
  return <InnerYouTube content={props.content}/>
}

export function AutoYouTube(props: ArticlePartsProps) {
  return <InnerAutoYouTube content={props.content}/>
}
