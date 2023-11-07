'use client'

import React, { useEffect } from 'react'

import matter from 'gray-matter'
import { useForm } from 'react-hook-form'

import { getTypedEntries } from '@/lib/utils'

import { BlogFrontMatter, blogFrontMatterSchema } from '@blog/_lib/blogPost'

import styles from './page.module.scss'

type Props = {
  onChange: (value: BlogFrontMatter) => void
  initialMarkdown: string
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
  const { register, handleSubmit, setValue } = useForm<BlogFrontMatter>()

  useEffect(() => {
    const formValues = blogFrontMatterSchema
      .partial()
      .parse(matter(props.initialMarkdown).data)
    for (const [key, value] of getTypedEntries(formValues)) {
      setValue(key, value)
    }
  }, [props.initialMarkdown, setValue])

  return (
    <>
      <form
        onChange={handleSubmit(data => {
          for (const [key, value] of getTypedEntries(data)) {
            if (value === '') {
              delete data[key]
            }
          }
          props.onChange(data)
        })}
        className={styles.editor_form}
      >
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
