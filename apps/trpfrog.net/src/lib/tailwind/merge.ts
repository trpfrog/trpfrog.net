/* eslint-disable no-restricted-imports */

import { extendTailwindMerge } from 'tailwind-merge'

export const twMergeConfig: Parameters<typeof extendTailwindMerge>[0] = {
  prefix: 'tw-',
}

export const twMerge = extendTailwindMerge(twMergeConfig)

export { twJoin } from 'tailwind-merge'
