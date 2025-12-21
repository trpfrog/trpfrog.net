import { useCallback } from 'react'

import { devBlogServerClient } from '@trpfrog.net/dev-blog-server'
import dedent from 'ts-dedent'
import { useImmerReducer } from 'use-immer'

function uploadingStateImmerReducer(
  draft: { isFinished: boolean; total: number; altProgress: number; uploadProgress: number },
  action:
    | { type: 'append'; altProgress?: number; uploadProgress?: number }
    | { type: 'start'; total: number }
    | { type: 'finish' },
) {
  switch (action.type) {
    case 'start':
      draft.isFinished = false
      draft.total = action.total
      draft.altProgress = 0
      draft.uploadProgress = 0
      return
    case 'append':
      draft.altProgress += action.altProgress ?? 0
      draft.uploadProgress += action.uploadProgress ?? 0
      return
    case 'finish':
      draft.isFinished = true
  }
}

export function useImageUploader(slug: string) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Forbidden')
  }

  const uploadImage = useCallback(
    async (file: File) => {
      const res = await devBlogServerClient.upload_image.$post({
        form: {
          slug: slug.startsWith('_') ? slug.slice(1) : slug,
          image: file,
        },
      })
      if (res.ok) {
        return res.json().then(e => e.path)
      } else {
        const error = await res.json().then(e => e.error)
        throw new Error('Failed to upload image: ' + error)
      }
    },
    [slug],
  )

  const generateAltText = useCallback(async (file: File) => {
    const res = await devBlogServerClient.generate_alt_text.$post(
      {
        form: { image: file },
      },
      {},
    )
    if (res.ok) {
      return res.json().then(e => e.altText)
    } else {
      throw new Error('Failed to generate alt text')
    }
  }, [])

  const appendLine = useCallback(
    async (line: string) => {
      const res = await devBlogServerClient.edit.append_line.$post({
        json: { slug, line },
      })
      if (!res.ok) {
        const error = await res
          .json()
          .then(e => e.error)
          .catch(() => res.statusText)
        throw new Error('Failed to append line: ' + error)
      }
    },
    [slug],
  )

  const [uploadingStatus, updateUploadingStatus] = useImmerReducer(uploadingStateImmerReducer, {
    isFinished: true,
    total: 0,
    altProgress: 0,
    uploadProgress: 0,
  })

  const upload = useCallback(
    async (files: File[]) => {
      updateUploadingStatus({ type: 'start', total: files.length })

      const result = await Promise.all(
        files.map(async file => {
          try {
            const [path, altResult] = await Promise.all([
              uploadImage(file).then(path => {
                updateUploadingStatus({ type: 'append', uploadProgress: 1 })
                return path
              }),
              generateAltText(file)
                .then(alt => {
                  updateUploadingStatus({ type: 'append', altProgress: 1 })
                  return { ok: true as const, alt }
                })
                .catch(() => ({ ok: false as const })),
            ])

            return { path, alt: altResult.ok ? altResult.alt : 'FAILED TO GENERATE ALT TEXT' }
          } catch {
            return { path: 'FAILED TO UPLOAD IMAGE', alt: 'SKIPPED ALT GENERATION' }
          }
        }),
      )

      updateUploadingStatus({ type: 'finish' })
      return result.map(e => ({
        ...e,
        markdown: `![${e.alt}](${e.path})`,
      }))
    },
    [generateAltText, updateUploadingStatus, uploadImage],
  )

  const uploadingStatusText = uploadingStatus.isFinished
    ? null
    : dedent`
      Alt Generation: ${uploadingStatus.altProgress}/${uploadingStatus.total}
        Image Upload: ${uploadingStatus.uploadProgress}/${uploadingStatus.total}
    `

  return {
    uploadingStatusText,
    uploadingStatus,
    upload,
    appendLine,
  }
}
