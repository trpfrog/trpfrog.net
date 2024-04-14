// eslint-disable-next-line
import { extendTailwindMerge } from 'tailwind-merge'

export const twMergeConfig: Parameters<typeof extendTailwindMerge>[0] = {
  prefix: 'tw-',
}

export const twMerge = extendTailwindMerge(twMergeConfig)
