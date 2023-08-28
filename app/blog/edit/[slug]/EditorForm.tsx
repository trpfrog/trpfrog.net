'use client'

import {useForm} from "react-hook-form";
import {BlogFrontMatter, blogFrontMatterSchema, buildBlogPost} from "@blog/_lib/blogPost";
import {getTypedEntries, getTypedKeys} from "@/lib/utils";
import matter from "gray-matter";
import {useCallback, useEffect, useMemo} from "react";

type Props = {
  setPost: ((value: string) => void)
  rawMarkdown: string
}

export default function EditorForm(props: Props) {
  const blogPost = useMemo(() => buildBlogPost(props.rawMarkdown, {all: true}), [props.rawMarkdown])
  const { content: contentPart } = matter(props.rawMarkdown)

  const { register, handleSubmit, setValue } = useForm<BlogFrontMatter>();

  useEffect(() => {
    const formValues = blogFrontMatterSchema.partial().parse(blogPost)
    for (const [key, value] of getTypedEntries(formValues)) {
      setValue(key, value)
    }
  }, [blogPost, setValue])

  const onSubmit = useCallback((data: BlogFrontMatter) => {
    for (const key of getTypedKeys(data)) {
      if (!data[key]) {
        delete data[key]
      }
    }
    props.setPost(matter.stringify(contentPart, data))
  }, [props, contentPart])

  return (
    <>
      <form onChange={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <input {...register("title")} />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" {...register("date")} />
        </div>
        <div>
          <label htmlFor="updated">Updated</label>
          <input type="date" {...register("updated")} />
        </div>
        <div>
          <label htmlFor="held">Held</label>
          <input type="date" {...register("held")} />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input {...register("tags")} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input {...register("description")} />
        </div>
        <div>
          <label htmlFor="thumbnail">Thumbnail</label>
          <input {...register("thumbnail")} />
        </div>
      </form>
    </>
  );
}
