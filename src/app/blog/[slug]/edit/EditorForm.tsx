'use client'

import React, { useCallback, useEffect, useMemo } from 'react'

import matter from 'gray-matter'
import { useForm } from 'react-hook-form'

import { getTypedEntries, getTypedKeys } from '@/lib/utils'

import {
  BlogFrontMatter,
  blogFrontMatterSchema,
  buildBlogPost,
} from '@blog/_lib/blogPost'

import styles from './page.module.scss'

type Props = {
  setPost: (value: string) => void
  rawMarkdown: string
  markAsUnsaved: () => void
}

function FormItem(
  props: React.PropsWithChildren<{ htmlFor?: string; label: string }>,
) {
  return (
    <div className={styles.form_item}>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <div>{props.children}</div>
    </div>
  )
}

export function EditorForm(props: Props) {
  const blogPost = useMemo(
    () => buildBlogPost(props.rawMarkdown, { all: true }),
    [props.rawMarkdown],
  )
  const { content: contentPart } = matter(props.rawMarkdown)

  const { register, handleSubmit, setValue } = useForm<BlogFrontMatter>()

  useEffect(() => {
    const formValues = blogFrontMatterSchema.partial().parse(blogPost)
    for (const [key, value] of getTypedEntries(formValues)) {
      setValue(key, value)
    }
  }, [blogPost, setValue])

  const onSubmit = useCallback(
    (data: BlogFrontMatter) => {
      for (const key of getTypedKeys(data)) {
        if (!data[key]) {
          delete data[key]
        }
      }
      props.markAsUnsaved()
      props.setPost(matter.stringify(contentPart, data))
    },
    [props, contentPart],
  )

  return (
    <>
      <form onChange={handleSubmit(onSubmit)} className={styles.editor_form}>
        <div style={{ width: '100%' }}>
          <FormItem htmlFor="title" label="Title">
            <input {...register('title')} style={{ width: 500 }} />
          </FormItem>
        </div>
        <div style={{ width: '100%' }}>
          <FormItem htmlFor="description" label="Description">
            <textarea {...register('description')} style={{ width: 500 }} />
          </FormItem>
        </div>
        <FormItem htmlFor="date" label="Date">
          <input type="date" {...register('date')} />
        </FormItem>
        <FormItem htmlFor="updated" label="Updated">
          <input type="date" {...register('updated')} />
        </FormItem>
        <FormItem htmlFor="held" label="Held">
          <input type="date" {...register('held')} />
        </FormItem>
        <FormItem htmlFor="tags" label="Tags">
          <input {...register('tags')} />
        </FormItem>

        <FormItem htmlFor="thumbnail" label="Thumbnail">
          <input {...register('thumbnail')} />
        </FormItem>
      </form>
    </>
  )
}
