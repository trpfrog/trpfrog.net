import BlogPost from "@blog/_lib/blogPost";
import {BlogImageData} from "@blog/_lib/imagePropsFetcher";
import React from "react";

type ArticlePartsProps = {
  content: string,
  entry?: BlogPost,
  imageSize?: { [path: string]: BlogImageData }
}

export type ArticleParts =
  | ((props: ArticlePartsProps) => React.ReactNode)
  | React.ExoticComponent<ArticlePartsProps>
