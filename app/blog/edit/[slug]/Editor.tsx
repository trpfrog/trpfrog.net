'use client';

import "easymde/dist/easymde.min.css";
import React, {useCallback, useMemo} from "react";

import dynamic from 'next/dynamic'
import type {SimpleMDEReactProps} from "react-simplemde-editor";
import useSparseCallback from "@/hooks/useSparseCallback";
import useUploadFunction from "@blog/edit/_hooks/useUploadFunction";
import useSaveArticle from "@blog/edit/_hooks/useSaveArticle";
import useToastErrorCallback from "@blog/edit/_hooks/useToastErrorCallback";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type Props = {
  rawMarkdown: string
  setPost: ((value: string) => void)
  slug: string
}

export default React.memo(function Editor({ setPost, slug, rawMarkdown }: Props) {

  const delayMs = 2000
  const { markAsUnsaved } = useSaveArticle(slug, rawMarkdown, delayMs)
  const sparseSetter = useSparseCallback(setPost, [setPost], delayMs)

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
      <SimpleMDE
        value={rawMarkdown}
        onChange={changeHandler}
        options={options}
      />
    </>
  )
})
