import { clientEnv } from '@/env/client'

export const LOREM_IPSUM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
].join('')

export const SITE_NAME = 'つまみネット'

export const TWITTER_ID = 'TrpFrog'

export const TRPFROG_DIFFUSION_DEFAULT_UPDATE_HOURS = 3
export const TRPFROG_DIFFUSION_UPDATE_HOURS_EDGE_CONFIG_KEY =
  'trpfrog-diffusion-update-hours'

export const ATCODER_HIGHEST = 1596
export const WALKING_FARTHEST = '70.5km'

export const PRODUCTION_ORIGIN = 'https://trpfrog.net'
export const DEVELOPMENT_ORIGIN = 'http://localhost:3000'

export const HOST_URL =
  clientEnv.NODE_ENV === 'production'
    ? `https://${clientEnv.VERCEL_URL || 'trpfrog.net'}`
    : DEVELOPMENT_ORIGIN

export const DEFAULT_BLOG_THUMBNAIL =
  'https://res.cloudinary.com/trpfrog/TwitterCard'

export const MARKDOWN_WATCHER_PORT = 4000
