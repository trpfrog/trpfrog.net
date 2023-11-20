import { useEffect, useState } from 'react'

import { loadMarkdownFromServer } from '@blog/[slug]/edit/_actions/loadMarkdownFromServer'

export type MarkdownState = {
  isLoading: boolean
  slug: string
  currentMarkdown: string
  setCurrentMarkdown: (markdown: string) => void
  initialMarkdown: string
}

export function useMarkdownState(slug: string): MarkdownState {
  const [isLoading, setIsLoading] = useState(true)
  const [currentMarkdown, setCurrentMarkdown] = useState('')
  const [initialMarkdown, setInitialMarkdown] = useState('')

  useEffect(() => {
    loadMarkdownFromServer(slug)
      .then(text => {
        setCurrentMarkdown(text)
        setInitialMarkdown(text)
        setIsLoading(false)
      })
      .catch(console.error)
  }, [slug])

  return {
    isLoading,
    slug,
    currentMarkdown,
    setCurrentMarkdown,
    initialMarkdown,
  }
}
