'use client';

import "easymde/dist/easymde.min.css";
import React, {useCallback, useMemo} from "react";

import dynamic from 'next/dynamic'
import {useKeyboardEvent, useUnmountEffect} from "@react-hookz/web";
import type { SimpleMDEReactProps } from "react-simplemde-editor";
import useSparseCallback from "@/hooks/useSparseCallback";
import toast from "react-hot-toast";
import {setTimeoutPromise} from "@/lib/setTimeoutPromise";
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type Props = {
  rawMarkdown: string
  setPost: ((value: string) => void)
  slug: string
}

function useSaveArticle(slug: string, articleText: string, delayMs: number) {
  const [alreadySaved, setAlreadySaved] = React.useState(true)

  const isSaveKeyPressed = useCallback((e: KeyboardEvent) => (
    ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && e.key == 's'
  ), [])

  useKeyboardEvent(isSaveKeyPressed, (e) => {
    e.preventDefault()

    if (alreadySaved) {
      toast('Already saved!', { icon: '👍', duration: 2000 })
      return
    }

    void toast.promise(
      setTimeoutPromise(() => {
        setAlreadySaved(false)
        void fetch(`/blog/edit/${slug}/api/save`, {
          method: 'POST',
          body: articleText,
        })
      }, delayMs),
      {
        loading: 'Saving...',
        success: <b>Saved!</b>,
        error: <b>Something went wrong...</b>,
      }
    )
  }, [slug, articleText, setAlreadySaved])

  useUnmountEffect(() => {
    if (!alreadySaved) {
      alert('You have unsaved changes! Please save before leaving the page.')
    }
  })

  return {
    markAsUnsaved: useCallback(() => setAlreadySaved(false), [setAlreadySaved])
  }
}

export default React.memo(function Editor({ setPost, slug, rawMarkdown }: Props) {

  const delayMs = 2000
  const { markAsUnsaved } = useSaveArticle(slug, rawMarkdown, delayMs)
  const sparseSetter = useSparseCallback(setPost, [setPost], delayMs)

  const changeHandler = useCallback((value: string) => {
    markAsUnsaved()
    sparseSetter(value)
  }, [sparseSetter, markAsUnsaved])


  const options = useMemo(() => ({
    renderingConfig: {
      codeSyntaxHighlighting: false,
    },
    unorderedListStyle: '-',
    uploadImage: true,
    imageUploadEndpoint: `/blog/edit/${slug}/api/upload-image`,
    imageMaxSize: 10 * 1024 * 1024,
    imagePathAbsolute: false,
  } satisfies SimpleMDEReactProps['options']), [slug])

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
