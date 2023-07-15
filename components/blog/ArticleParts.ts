import BlogPost from "@blog/lib/blogPost";
import {BlogImageData} from "@blog/lib/imagePropsFetcher";
import React from "react";

export type ArticleParts = (
  content: string,
  entry?: BlogPost,
  imageSize?: { [path: string]: BlogImageData }
) => React.ReactNode
