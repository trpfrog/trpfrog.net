'use client'

import 'easymde/dist/easymde.min.css'
import React, { useCallback, useDeferredValue, useMemo } from 'react'

import matter from 'gray-matter'
import dynamic from 'next/dynamic'

import { Button } from '@/components/atoms/Button'
import { H2 } from '@/components/atoms/H2'

import { useSparseCallback } from '@/hooks/useSparseCallback'

import { getTypedKeys } from '@/lib/utils'

import { openInCotEditor } from '@blog/[slug]/edit/_actions/openInCotEditor'
import { useSaveArticle } from '@blog/[slug]/edit/_hooks/useSaveArticle'
import { useToastErrorCallback } from '@blog/[slug]/edit/_hooks/useToastErrorCallback'
import { useUploadFunction } from '@blog/[slug]/edit/_hooks/useUploadFunction'
import { EditorForm } from '@blog/[slug]/edit/EditorForm'
import { BlogFrontMatter, blogFrontMatterSchema } from '@blog/_lib/blogPost'

import type { SimpleMDEReactProps } from 'react-simplemde-editor'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type Props = {
  rawMarkdown: string
  setPost: (value: string) => void
  slug: string
}

export const Editor = React.memo(function Editor({
  setPost,
  slug,
  rawMarkdown,
}: Props) {
  const delayMs = 2000

  const { markAsUnsaved, updateCurrent } = useSaveArticle(
    slug,
    rawMarkdown,
    delayMs,
  )

  const { data, content } = useMemo(() => matter(rawMarkdown), [rawMarkdown])

  const sparseSetter = useSparseCallback(
    (frontMatter?: BlogFrontMatter, content?: string) => {
      if (frontMatter) {
        for (const key of getTypedKeys(frontMatter)) {
          if (!data[key]) {
            delete data[key]
          }
        }
      }
      const saved = updateCurrent(frontMatter, content)
      setPost(saved)
    },
    [data, setPost, updateCurrent],
    delayMs,
  )

  const onFormChange = useCallback(
    (rawFrontMatter: BlogFrontMatter) => {
      const frontMatter = blogFrontMatterSchema.partial().parse(rawFrontMatter)
      markAsUnsaved()
      sparseSetter(frontMatter, null)
    },
    [markAsUnsaved, sparseSetter],
  )

  const onMarkdownChange = useCallback(
    (value: string) => {
      markAsUnsaved()
      sparseSetter(null, value)
    },
    [markAsUnsaved, sparseSetter],
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
        <H2 icon="trpfrog" style={{ display: 'inline-block' }}>
          つまみログエディタ
        </H2>
        <div style={{ display: 'flex', gap: 5 }}>
          <Button onClick={() => openInCotEditor(slug)}>
            Open in CotEditor
          </Button>
          <Button externalLink href={`/blog/${slug}/og-image`}>
            View OG Image
          </Button>
        </div>
      </div>
      <hr style={{ margin: '1rem 0' }} />
      <h3>Front-matter</h3>
      <EditorForm onChange={onFormChange} initialMarkdown={rawMarkdown} />
      <h3>Contents</h3>
      <EditorUI
        initialContent={useDeferredValue(content)}
        onChange={onMarkdownChange}
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
