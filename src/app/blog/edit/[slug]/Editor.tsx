'use client'

import 'easymde/dist/easymde.min.css'
import React, { useCallback, useDeferredValue, useMemo } from 'react'

import dynamic from 'next/dynamic'
import type { SimpleMDEReactProps } from 'react-simplemde-editor'
import useSparseCallback from '@/hooks/useSparseCallback'
import useUploadFunction from '@blog/edit/_hooks/useUploadFunction'
import useSaveArticle from '@blog/edit/_hooks/useSaveArticle'
import useToastErrorCallback from '@blog/edit/_hooks/useToastErrorCallback'
import EditorForm from '@blog/edit/[slug]/EditorForm'
import matter from 'gray-matter'
import { blogFrontMatterSchema } from '@blog/_lib/blogPost'
import Button from '@/components/atoms/Button'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type Props = {
  rawMarkdown: string
  setPost: (value: string) => void
  slug: string
}

export default React.memo(function Editor({
  setPost,
  slug,
  rawMarkdown,
}: Props) {
  const delayMs = 2000
  const { markAsUnsaved } = useSaveArticle(slug, rawMarkdown, delayMs)

  const { data, content } = useMemo(() => matter(rawMarkdown), [rawMarkdown])

  const sparseSetter = useSparseCallback(
    (content: string) => {
      const frontMatter = blogFrontMatterSchema.partial().parse(data)
      setPost(matter.stringify(content, frontMatter))
    },
    [data, setPost],
    1000,
  )

  const changeHandler = useCallback(
    (value: string) => {
      markAsUnsaved()
      sparseSetter(value)
    },
    [sparseSetter, markAsUnsaved],
  )

  const imageUploadFunction = useUploadFunction(slug)
  const errorCallback = useToastErrorCallback()

  const options = useMemo(
    () =>
      ({
        renderingConfig: {
          codeSyntaxHighlighting: false,
        },
        unorderedListStyle: '-',

        uploadImage: true,
        imageUploadFunction,
        lineNumbers: true,

        nativeSpellcheck: false,
        spellChecker: false,
        errorCallback,
      }) satisfies SimpleMDEReactProps['options'],
    [imageUploadFunction, errorCallback],
  )

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ display: 'inline-block' }}>つまみログエディタ</h2>
        <Button onClick={() => fetch(`/api/blog/open/${slug}`)}>
          ファイルを開く
        </Button>
      </div>
      <hr style={{ margin: '1rem 0' }} />
      <h3>Front-matter</h3>
      <EditorForm
        setPost={setPost}
        rawMarkdown={rawMarkdown}
        markAsUnsaved={markAsUnsaved}
      />
      <h3>Contents</h3>
      <EditorUI
        initialContent={useDeferredValue(content)}
        onChange={changeHandler}
        options={options}
      />
    </>
  )
})

const EditorUI = React.memo(function EditorUI(props: {
  initialContent: string
  onChange: SimpleMDEReactProps['onChange']
  options: SimpleMDEReactProps['options']
}) {
  return (
    <>
      <SimpleMDE
        value={props.initialContent}
        onChange={props.onChange}
        options={props.options}
        style={{ padding: 0 }}
      />
    </>
  )
})
