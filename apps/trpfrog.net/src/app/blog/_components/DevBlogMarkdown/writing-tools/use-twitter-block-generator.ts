'use client'

import { useCallback } from 'react'

import { devBlogServerClient } from '@trpfrog.net/dev-blog-server'
import toast from 'react-hot-toast'

type TweetBlockRequestPayload = Parameters<
  typeof devBlogServerClient.create_tweet_block.$post
>[0]['json']

export function useTwitterBlockGenerator(options: { onOutput: (codeBlock: string) => void }) {
  const handleOutput = useCallback(
    async (codeBlock: string) => {
      options.onOutput(codeBlock)
      try {
        await navigator.clipboard.writeText(codeBlock)
        toast.success('Copied!')
      } catch {
        toast.error('クリップボードにコピーできませんでした')
      }
    },
    [options],
  )

  const createRequest = useCallback(
    async (payload: TweetBlockRequestPayload) => {
      const res = await toast.promise(
        (async () => {
          const response = await devBlogServerClient.create_tweet_block.$post({ json: payload })
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
      await handleOutput(codeBlock)
    },
    [handleOutput],
  )

  const generateFromUrl = useCallback(
    async (rawUrl: string) => {
      const url = rawUrl.trim()
      try {
        await createRequest({ source: 'url', url })
      } catch {
        return
      }
    },
    [createRequest],
  )

  const generateFromServerClipboard = useCallback(async () => {
    try {
      await createRequest({ source: 'server-side-clipboard' })
    } catch {
      return
    }
  }, [createRequest])

  return { generateFromUrl, generateFromServerClipboard }
}
