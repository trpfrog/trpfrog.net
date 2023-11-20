import React from 'react'

export function useScrollToBottom() {
  const editorBlockRef = React.useRef<HTMLDivElement>(null)
  const scrollToBottom = React.useCallback(() => {
    if (editorBlockRef.current) {
      editorBlockRef.current.scrollTop = editorBlockRef.current.scrollHeight
    }
    if (document) {
      document.documentElement.scrollTop = document.documentElement.scrollHeight
    }
  }, [])

  return { editorBlockRef, scrollToBottom }
}
