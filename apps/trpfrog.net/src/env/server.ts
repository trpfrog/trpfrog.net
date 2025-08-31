import 'server-only'
import { validateUnknown } from '@trpfrog.net/utils'
import * as v from 'valibot'

import { CommonEnvSchema } from '@/env/common'

export const ServerEnvSchema = v.object({
  ...CommonEnvSchema.entries,
  /**
   * Cloudinary API Keys. Used for uploading images and videos.
   */
  CLOUDINARY_API_KEY: v.optional(v.string()),
  CLOUDINARY_API_SECRET: v.optional(v.string()),
  CLOUDINARY_CLOUD_NAME: v.optional(v.string(), 'trpfrog'),

  DATABASE_URL: v.optional(v.pipe(v.string(), v.url())),
  EDGE_CONFIG: v.optional(v.pipe(v.string(), v.url())),

  /**
   * MicroCMS API Key.
   * Used for fetching DRAFT blog posts.
   */
  MICRO_CMS_API_KEY: v.optional(v.string(), () => {
    console.warn('MICRO_CMS_API_KEY is not set, this causes preview of draft blog posts to fail')
    return undefined
  }),

  /**
   * Vercel KV Environment Variables.
   * Used for caching and storing data.
   */
  KV_REST_API_READ_ONLY_TOKEN: v.optional(v.string()),
  KV_REST_API_TOKEN: v.optional(v.string()),
  KV_REST_API_URL: v.optional(v.pipe(v.string(), v.url())),
  KV_URL: v.optional(v.pipe(v.string(), v.url())),

  /**
   * Google Fonts API Key. Used for fetching font files.
   * Used for rendering blog OG images.
   */
  GOOGLE_FONTS_API_KEY: v.optional(v.string(), () => {
    console.warn('GOOGLE_FONTS_API_KEY is not set, this may cause some functions to fail')
    return undefined
  }),

  /**
   * OpenAI API Key.
   * Used for /fuzzy routing and AI icon generation.
   */
  OPENAI_API_KEY: v.optional(v.string(), () => {
    console.warn('OPENAI_API_KEY is not set, this may cause some functions to fail')
    return undefined
  }),

  /**
   * Server-side secret key for the functions API (Cloud Functions)
   * Used for generating AI icons.
   */
  TRPFROG_FUNCTIONS_SECRET: v.optional(v.string(), () => {
    console.warn('TRPFROG_FUNCTIONS_SECRET is not set, using default value')
    return 'trpfrog-functions-secret'
  }),

  /**
   * Content ID for the temporary Twitter content in microCMS.
   */
  TEMP_TWITTER_CONTENT_ID: v.optional(v.string()),

  /**
   * Server-side secret key for the admin API.
   * You can set any string here.
   * Used for protecting the admin API.
   */
  TRPFROG_ADMIN_KEY: v.optional(v.string(), () => {
    console.warn('TRPFROG_ADMIN_KEY is not set, using default value')
    return 'default'
  }),

  /**
   * Dev flag for enabling the realtime blog preview.
   */
  USE_DEV_REALTIME_BLOG_PREVIEW: v.optional(v.pipe(v.string(), v.toLowerCase(), v.trim()), 'true'),
})

// eslint-disable-next-line n/no-process-env -- This is a rule to use validated env instead of process.env
export const env = validateUnknown(ServerEnvSchema, process.env)
