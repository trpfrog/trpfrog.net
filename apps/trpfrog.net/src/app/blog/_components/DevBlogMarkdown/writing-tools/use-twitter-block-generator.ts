'use client'

import { useCallback } from 'react'

import { devBlogServerClient } from '@trpfrog.net/dev-blog-server'
import toast from 'react-hot-toast'

export function useTwitterBlockGenerator(options: { onOutput: (codeBlock: string) => void }) {
  const generateFromUrl = useCallback(
    async (rawUrl: string) => {
      const url = rawUrl.trim()
      if (!url) {
        toast.error('URLが空です')
        return
      }
      try {
        const res = await toast.promise(
          (async () => {
            const response = await devBlogServerClient.create_tweet_block.$post({ json: { url } })
            if (!response.ok) {
              const error = await response
                .json()
                .then(e => e.error)
                .catch(() => response.statusText)
              throw new Error(error)
            }
            return response
          })(),
          {
            loading: 'Generating...',
            success: 'Generated!',
            error: error => (error instanceof Error ? error.message : 'Failed to generate'),
          },
        )
        const { codeBlock } = await res.json()
        options.onOutput(codeBlock)

        try {
          await navigator.clipboard.writeText(codeBlock)
          toast.success('Copied!')
        } catch {
          toast.error('クリップボードにコピーできませんでした')
        }
      } catch {
        return
      }
    },
    [options],
  )

  return { generateFromUrl }
}
