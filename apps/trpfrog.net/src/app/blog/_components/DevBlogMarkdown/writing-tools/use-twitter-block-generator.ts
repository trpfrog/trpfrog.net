'use client'

import { useCallback } from 'react'

import { toast } from '@ui-sdk/react/toast'

import { devBlogServerClient } from '@trpfrog.net/dev-blog-server'

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
      const request = (async () => {
        const response = await devBlogServerClient.create_tweet_block.$post({ json: payload })
        if (!response.ok) {
          const error = await response
            .json()
            .then(e => e.error)
            .catch(() => response.statusText)
          throw new Error(error)
        }
        return response
      })()
      toast.promise(request, {
        loading: 'Generating...',
        success: 'Generated!',
        error: error => (error instanceof Error ? error.message : 'Failed to generate'),
      })
      const res = await request
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
