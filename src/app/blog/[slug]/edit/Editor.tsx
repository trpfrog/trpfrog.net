'use client'

import 'easymde/dist/easymde.min.css'
import React, { useMemo } from 'react'

import matter from 'gray-matter'
import dynamic from 'next/dynamic'

import { Button } from '@/components/atoms/Button'
import { H2 } from '@/components/atoms/H2'

import { openInCotEditor } from '@blog/[slug]/edit/_actions/openInCotEditor'
import { useEditorHandler } from '@blog/[slug]/edit/_hooks/useEditorHandler'
import { useSaveArticle } from '@blog/[slug]/edit/_hooks/useSaveArticle'
import { useToastErrorCallback } from '@blog/[slug]/edit/_hooks/useToastErrorCallback'
import { useUploadFunction } from '@blog/[slug]/edit/_hooks/useUploadFunction'
import { EditorForm } from '@blog/[slug]/edit/EditorForm'

import { MarkdownState } from './_hooks/useMarkdownState'

import type { SimpleMDEReactProps } from 'react-simplemde-editor'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type Props = {
  markdownState: MarkdownState
}

export const Editor = React.memo(function Editor({ markdownState }: Props) {
  const { slug, currentMarkdown, initialMarkdown } = markdownState

  useSaveArticle(slug, currentMarkdown)
  const { onFormChange, onMarkdownChange } = useEditorHandler(
    markdownState.currentMarkdown,
    markdownState.setCurrentMarkdown,
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

  const { content: initialContent } = useMemo(
    () => matter(initialMarkdown),
    [initialMarkdown],
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
      <EditorForm onChange={onFormChange} initialMarkdown={initialMarkdown} />
      <h3>Contents</h3>
      <EditorUI
        initialContent={initialContent}
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
