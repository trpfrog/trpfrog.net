import React, { useCallback } from 'react'

import { UploadApiResponse } from 'cloudinary'
import toast from 'react-hot-toast'

async function uploadToCloudinary(
  slug: string,
  file: File,
): Promise<UploadApiResponse> {
  const formData = new FormData()
  formData.append('image', file)

  const endpoint = `/blog/${slug}/edit/api/upload-image`
  const res = await fetch(endpoint, { method: 'POST', body: formData })

  if (!res.ok) {
    throw new Error(`Upload failed (${res.status} ${res.statusText})`)
  }

  const json = await res.json()
  return json.data
}

export function useUploadFunction(slug: string) {
  return useCallback(
    (
      file: File,
      onSuccess: (imageUrl: string) => void,
      onError: (errorMessage: string) => void,
    ) => {
      const formData = new FormData()
      formData.append('image', file)

      const uploadPromise = toast.promise(uploadToCloudinary(slug, file), {
        loading: 'Uploading...',
        success: <b>Uploaded!</b>,
        error: <b>Something went wrong...</b>,
      })

      uploadPromise
        .then(({ public_id, format, width, height }) => {
          onSuccess(`/${public_id}.${format}?w=${width}&h=${height}`)
        })
        .catch(err => onError(err.message))
    },
    [slug],
  )
}
