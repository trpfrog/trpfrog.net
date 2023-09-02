import React, {useCallback} from "react";
import toast from "react-hot-toast";
import {UploadApiResponse} from "cloudinary";

export default function useUploadFunction(slug: string) {
  return useCallback((
    file: File,
    onSuccess: (imageUrl: string) => void,
    onError: (errorMessage: string) => void
  ) => {
    const formData = new FormData()
    formData.append('image', file)

    const uploadPromise = toast.promise(
      (async () => {
        const res = await fetch(`/blog/edit/${slug}/api/upload-image`, {
          method: 'POST',
          body: formData,
        })
        if (!res.ok) {
          throw new Error(`Upload failed (${res.status} ${res.statusText})`)
        }
        return res
      })(),
      {
        loading: 'Uploading...',
        success: <b>Uploaded!</b>,
        error: <b>Something went wrong...</b>,
      }
    )
    uploadPromise
      .then(res => res.json())
      .then(({data: {format, public_id}}: { data: UploadApiResponse }) => {
        onSuccess(`/${public_id}.${format}`)
      })
      .catch(err => onError(err.message))
  }, [slug])
}
