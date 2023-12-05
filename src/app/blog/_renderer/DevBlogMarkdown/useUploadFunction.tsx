import React, { useCallback } from 'react'

import toast from 'react-hot-toast'

import { uploadToCloudinaryOnServer } from '@blog/_renderer/DevBlogMarkdown/uploadToCloudinaryOnServer'

export function useUploadFunction(slug: string) {
  return useCallback(
    (
      file: File,
      onSuccess: (imageUrl: string) => void,
      onError: (errorMessage: string) => void,
    ) => {
      const formData = new FormData()
      formData.append('image', file)
      const uploadPromise = uploadToCloudinaryOnServer(formData, slug)

      toast
        .promise(uploadPromise, {
          loading: 'Uploading...',
          success: <b>Uploaded!</b>,
          error: <b>Something went wrong...</b>,
        })
        .then(({ public_id, format, width, height }) => {
          onSuccess(`/${public_id}.${format}?w=${width}&h=${height}`)
        })
        .catch(err => onError(err.message))
    },
    [slug],
  )
}
