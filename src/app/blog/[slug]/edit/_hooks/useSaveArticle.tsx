import React, { useCallback, useEffect } from 'react'

import { useKeyboardEvent, useUnmountEffect } from '@react-hookz/web'
import matter from 'gray-matter'
import toast from 'react-hot-toast'

import { setTimeoutPromise } from '@/lib/setTimeoutPromise'

import { openInCotEditor } from '@blog/[slug]/edit/_actions/openInCotEditor'
import { saveOnDisk } from '@blog/[slug]/edit/_actions/saveOnDisk'
import { BlogFrontMatter } from '@blog/_lib/blogPost'

export function useSaveArticle(slug: string, initialArticleText: string) {
  const [articleLastSaved, setArticleLastSaved] = React.useState<
    string | null
  >()

  // articleText を直接参照すると save 関数が逐次更新されてしまうため ref を経由させる
  // (逐次更新が起こるとオートセーブの interval が毎度更新され、オートセーブされなくなる)
  const articleTextRef = React.useRef<string | null>(null)
  useEffect(() => {
    articleTextRef.current = initialArticleText
  }, [initialArticleText])

  const isAlreadySaved = useCallback(() => {
    const articleToSave = articleTextRef.current!
    return articleLastSaved === articleToSave
  }, [articleLastSaved])

  // Check if Ctrl+S is pressed
  const isSaveKeyPressed = useCallback(
    (e: KeyboardEvent) =>
      ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && e.key === 's',
    [],
  )

  // Save function
  const save = useCallback(async () => {
    return setTimeoutPromise(() => {
      if (!isAlreadySaved()) {
        const articleToSave = articleTextRef.current!
        setArticleLastSaved(articleToSave)
        return saveOnDisk(slug, articleToSave)
      }
    }, 1500)
  }, [isAlreadySaved, slug])

  const saveWithToast = useCallback(async () => {
    const openEditor = () => openInCotEditor(slug)
    if (isAlreadySaved()) {
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
  }, [isAlreadySaved, save, slug])

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
      if (!isAlreadySaved()) return
      saveWithToast().catch(console.error)
    }, 1000 * 60)

    console.log('effect')

    return () => clearInterval(interval)
  }, [isAlreadySaved, saveWithToast])

  // Save on unmount
  useUnmountEffect(() => {
    save().catch(console.error)
  })

  // Prevent closing window without saving
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isAlreadySaved()) return
      e.preventDefault()
      e.returnValue = true
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isAlreadySaved])

  return {
    save,
    saveWithToast,
    updateCurrent: useCallback(
      (frontMatter?: BlogFrontMatter, text?: string) => {
        const { data: currentFrontMatter, content: currentContent } = matter(
          articleTextRef.current!,
        )
        const newFrontMatter = frontMatter ?? currentFrontMatter
        const newContent = text ?? currentContent
        articleTextRef.current = matter.stringify(newContent, newFrontMatter)
        return articleTextRef.current
      },
      [],
    ),
  }
}
