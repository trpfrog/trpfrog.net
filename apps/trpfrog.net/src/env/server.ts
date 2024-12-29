import 'server-only'
import { z } from 'zod'

import { CommonEnvSchema } from '@/env/common'

export const env = CommonEnvSchema.extend({
  /**
   * Cloudinary API Keys. Used for uploading images and videos.
   */
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().default('trpfrog'),

  DATABASE_URL: z.string().url().optional(),
  EDGE_CONFIG: z.string().url().optional(),

  /**
   * MicroCMS API Key.
   * Used for fetching DRAFT blog posts.
   */
  MICRO_CMS_API_KEY: z.string().optional(),

  /**
   * Vercel KV Environment Variables.
   * Used for caching and storing data.
   */
  KV_REST_API_READ_ONLY_TOKEN: z.string().optional(),
  KV_REST_API_TOKEN: z.string().optional(),
  KV_REST_API_URL: z.string().url().optional(),
  KV_URL: z.string().url().optional(),

  /**
   * Google Fonts API Key. Used for fetching font files.
   * Used for rendering blog OG images.
   */
  GOOGLE_FONTS_API_KEY: z.string().optional(),

  /**
   * OpenAI API Key.
   * Used for /fuzzy routing and AI icon generation.
   */
  OPENAI_API_KEY: z.string().optional(),

  /**
   * Huggingface API Key.
   * Used for AI icon generation.
   */
  HUGGINGFACE_TOKEN: z.string().optional(),

  /**
   * Server-side secret key for the functions API (Cloud Functions)
   * Used for generating AI icons.
   */
  TRPFROG_FUNCTIONS_SECRET: z.string().optional(),

  /**
   * Content ID for the temporary Twitter content in microCMS.
   */
  TEMP_TWITTER_CONTENT_ID: z.string().optional(),

  /**
   * Server-side secret key for the admin API.
   * You can set any string here.
   * Used for protecting the admin API.
   */
  TRPFROG_ADMIN_KEY: z.string().default('default'),

  /**
   * Dev flag for enabling the realtime blog preview.
   */
  USE_DEV_REALTIME_BLOG_PREVIEW: z.string().toLowerCase().trim().default('true'),
})
  // eslint-disable-next-line n/no-process-env -- This is a rule to use validated env instead of process.env
  .parse(process.env)
