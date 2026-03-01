'use client'

import { useEffect } from 'react'

// DO NOT PASS UNTRUSTED CODE TO THIS COMPONENT
export function MarkdownUseEffect({ trustedCode }: { trustedCode: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // oxlint-disable-next-line typescript/no-implied-eval -- trusted code
      const userFunction = Function(trustedCode)
      const cleanup = userFunction()
      if (typeof cleanup === 'function') {
        return cleanup
      }
    }
  }, [trustedCode])
  return null
}
