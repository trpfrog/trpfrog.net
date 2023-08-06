import BlogPost from "@blog/_lib/blogPost";
import {BlogImageData} from "@blog/_lib/imagePropsFetcher";
import React from "react";
import {Options as ReactMarkdownOptions} from "react-markdown";

export type ServerArticlePartsProps = {
  content: string,
  entry?: BlogPost,
  imageSize?: { [path: string]: BlogImageData }
  mdOptions: Partial<ReactMarkdownOptions>
}

export type ServerArticleParts =
  | ((props: ServerArticlePartsProps) => React.ReactNode)
  | React.ExoticComponent<ServerArticlePartsProps>
