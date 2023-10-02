import React, { useCallback, useEffect } from 'react'

import { useKeyboardEvent, useUnmountEffect } from '@react-hookz/web'
import toast from 'react-hot-toast'

import { setTimeoutPromise } from '@/lib/setTimeoutPromise'

export default function useSaveArticle(
  slug: string,
  articleText: string,
  delayMs: number,
) {
  const [alreadySaved, setAlreadySaved] = React.useState(true)

  // articleText を直接参照すると save 関数が逐次更新されてしまうため ref を経由させる
  // (逐次更新が起こるとオートセーブの interval が毎度更新され、オートセーブされなくなる)
  const articleTextRef = React.useRef<string | null>(null)
  useEffect(() => {
    articleTextRef.current = articleText
  }, [articleText])

  // Check if Ctrl+S is pressed
  const isSaveKeyPressed = useCallback(
    (e: KeyboardEvent) =>
      ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && e.key == 's',
    [],
  )

  // Save function
  const save = useCallback(async () => {
    if (!alreadySaved) {
      return setTimeoutPromise(() => {
        setAlreadySaved(true)
        return fetch(`/blog/edit/${slug}/api/save`, {
          method: 'POST',
          body: articleTextRef.current!,
        })
      }, delayMs)
    }
  }, [alreadySaved, delayMs, slug])

  const saveWithToast = useCallback(async () => {
    const openEditor = () => fetch(`/api/blog/open/${slug}`)
    if (alreadySaved) {
      toast(<span onClick={openEditor}>Already saved!</span>, {
        icon: '👍',
        duration: 2000,
      })
      return
    } else {
      await toast.promise(save(), {
        loading: 'Saving...',
        success: <b onClick={openEditor}>Saved!</b>,
        error: <b>Something went wrong...</b>,
      })
    }
  }, [alreadySaved, save, slug])

  // Save on Ctrl+S
  useKeyboardEvent(
    isSaveKeyPressed,
    e => {
      e.preventDefault()
      saveWithToast().catch(console.error)
    },
    [saveWithToast],
  )

  // Auto saving
  useEffect(() => {
    const interval = setInterval(() => {
      if (alreadySaved) return
      saveWithToast().catch(console.error)
    }, 1000 * 60)

    console.log('effect')

    return () => clearInterval(interval)
  }, [alreadySaved, saveWithToast])

  // Save on unmount
  useUnmountEffect(() => {
    save().catch(console.error)
  })

  // Prevent closing window without saving
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (alreadySaved) return
      e.preventDefault()
      e.returnValue = true
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [alreadySaved])

  return {
    markAsUnsaved: useCallback(() => setAlreadySaved(false), [setAlreadySaved]),
    save,
    saveWithToast,
  }
}
