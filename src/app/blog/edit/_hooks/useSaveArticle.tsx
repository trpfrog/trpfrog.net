import React, { useCallback } from 'react'

import { useKeyboardEvent, useUnmountEffect } from '@react-hookz/web'
import toast from 'react-hot-toast'

import { setTimeoutPromise } from '@/lib/setTimeoutPromise'

export default function useSaveArticle(
  slug: string,
  articleText: string,
  delayMs: number,
) {
  const [alreadySaved, setAlreadySaved] = React.useState(true)

  const isSaveKeyPressed = useCallback(
    (e: KeyboardEvent) =>
      ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && e.key == 's',
    [],
  )

  const save = useCallback(async () => {
    if (!alreadySaved) {
      return setTimeoutPromise(() => {
        setAlreadySaved(true)
        return fetch(`/blog/edit/${slug}/api/save`, {
          method: 'POST',
          body: articleText,
        })
      }, delayMs)
    }
  }, [alreadySaved, articleText, delayMs, slug])

  useKeyboardEvent(
    isSaveKeyPressed,
    e => {
      e.preventDefault()

      const openEditor = () => fetch(`/api/blog/open/${slug}`)

      if (alreadySaved) {
        toast(<span onClick={openEditor}>Already saved!</span>, {
          icon: '👍',
          duration: 2000,
        })
        return
      }

      void toast.promise(save(), {
        loading: 'Saving...',
        success: <b onClick={openEditor}>Saved!</b>,
        error: <b>Something went wrong...</b>,
      })
    },
    [slug, articleText, setAlreadySaved],
  )

  useUnmountEffect(() => {
    save().catch(console.error)
  })

  return {
    markAsUnsaved: useCallback(() => setAlreadySaved(false), [setAlreadySaved]),
  }
}
