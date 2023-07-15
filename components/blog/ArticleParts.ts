import BlogPost from "@/lib/blog/blogPost";
import {BlogImageData} from "@/lib/blog/imagePropsFetcher";
import React from "react";

export type ArticleParts = (
  content: string,
  entry?: BlogPost,
  imageSize?: { [path: string]: BlogImageData }
) => React.ReactNode
