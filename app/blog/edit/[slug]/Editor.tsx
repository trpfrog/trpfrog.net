'use client';

import "easymde/dist/easymde.min.css";
import React, {useCallback, useMemo} from "react";

import dynamic from 'next/dynamic'
import type {SimpleMDEReactProps} from "react-simplemde-editor";
import useSparseCallback from "@/hooks/useSparseCallback";
import useUploadFunction from "@blog/edit/_hooks/useUploadFunction";
import useSaveArticle from "@blog/edit/_hooks/useSaveArticle";
import useToastErrorCallback from "@blog/edit/_hooks/useToastErrorCallback";
import EditorForm from "@blog/edit/[slug]/EditorForm";
import matter from "gray-matter";
import {blogFrontMatterSchema} from "@blog/_lib/blogPost";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type Props = {
  rawMarkdown: string
  setPost: ((value: string) => void)
  slug: string
}

export default React.memo(function Editor({ setPost, slug, rawMarkdown }: Props) {

  const delayMs = 2000
  const { markAsUnsaved } = useSaveArticle(slug, rawMarkdown, delayMs)
  const { data, content: initialContent } = matter(rawMarkdown)

  const sparseSetter = useSparseCallback((content) => {
    const frontMatter = blogFrontMatterSchema.partial().parse(data)
    setPost(matter.stringify(content, frontMatter))
  }, [data, setPost], delayMs)

  const changeHandler = useCallback((value: string) => {
    markAsUnsaved()
    sparseSetter(value)
  }, [sparseSetter, markAsUnsaved])

  const imageUploadFunction = useUploadFunction(slug)
  const errorCallback = useToastErrorCallback()

  const options = useMemo(() => ({
    renderingConfig: {
      codeSyntaxHighlighting: false,
    },
    unorderedListStyle: '-',

    uploadImage: true,
    imageUploadFunction,

    nativeSpellcheck: false,
    spellChecker: false,
    errorCallback,
  } satisfies SimpleMDEReactProps['options']), [imageUploadFunction, errorCallback])

  return (
    <>
      <EditorForm setPost={setPost} rawMarkdown={rawMarkdown}/>
      <SimpleMDE
        value={initialContent}
        onChange={changeHandler}
        options={options}
      />
    </>
  )
})
