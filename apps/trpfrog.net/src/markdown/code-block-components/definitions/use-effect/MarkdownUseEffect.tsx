'use client'

import { useEffect } from 'react'

export function MarkdownUseEffect({ code }: { code: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userFunction = Function(code)
      const cleanup = userFunction()
      if (typeof cleanup === 'function') {
        return cleanup
      }
    }
  }, [code])
  return null
}
