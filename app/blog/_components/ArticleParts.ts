import BlogPost from "@blog/_lib/blogPost";
import {BlogImageData} from "@blog/_lib/imagePropsFetcher";
import React from "react";
import {Options as ReactMarkdownOptions} from "react-markdown";

type ArticlePartsProps = {
  content: string,
  entry?: BlogPost,
  imageSize?: { [path: string]: BlogImageData }
  mdOptions: Partial<ReactMarkdownOptions>
}

export type ArticleParts =
  | ((props: ArticlePartsProps) => React.ReactNode)
  | React.ExoticComponent<ArticlePartsProps>
