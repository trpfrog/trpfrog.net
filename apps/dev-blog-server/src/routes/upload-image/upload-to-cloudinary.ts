import { safeValidateUnknown, type InferSchemaOutput } from '@trpfrog.net/utils'
import * as v from 'valibot'

import { env } from '../../env'

import { cloudinary } from './cloudinary'

const CloudinaryUploadResponseSchema = v.object({
  public_id: v.string(),
  format: v.string(),
  width: v.number(),
  height: v.number(),
})

const CloudinaryErrorResponseSchema = v.object({
  error: v.object({
    message: v.string(),
  }),
})

type CloudinaryUploadResponse = InferSchemaOutput<typeof CloudinaryUploadResponseSchema>

/**
 * Uploads a file to Cloudinary using the Cloudinary SDK.
 * @param formData FormData with a file named 'image'
 * @param slug
 */
export async function uploadToCloudinary(
  file: File,
  slug: string,
): Promise<CloudinaryUploadResponse> {
  const publicId = file.name.split('.').slice(0, -1).join('-').replaceAll(' ', '_')
  const timestamp = Math.floor(Date.now() / 1000)

  const signatureParams = {
    folder: `blog/${slug}`,
    public_id: publicId,
    overwrite: 'true',
    invalidate: 'true',
    timestamp,
  }
  const signature = cloudinary.utils.api_sign_request(signatureParams, env.CLOUDINARY_API_SECRET)
  const uploadUrl = cloudinary.utils.api_url('upload', { resource_type: 'image' })

  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', env.CLOUDINARY_API_KEY)
  formData.append('timestamp', String(timestamp))
  formData.append('signature', signature)
  formData.append('public_id', publicId)
  formData.append('folder', `blog/${slug}`)
  formData.append('overwrite', 'true')
  formData.append('invalidate', 'true')

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })

  const payload = await response.json().catch(() => null)

  const parsed = response.ok ? safeValidateUnknown(CloudinaryUploadResponseSchema, payload) : null
  if (parsed?.success) {
    return parsed.output
  }

  const errorParsed = safeValidateUnknown(CloudinaryErrorResponseSchema, payload)
  const message = errorParsed.success
    ? errorParsed.output.error.message
    : `Upload failed (status: ${response.status})\nResponse: ${JSON.stringify(payload, null, 2)}`

  throw new Error(message)
}
