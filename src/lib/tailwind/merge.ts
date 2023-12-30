// eslint-disable-next-line
import { extendTailwindMerge } from 'tailwind-merge'

import type { Config } from 'tailwind-merge/src/lib/types'

export const twMergeConfig: Partial<Config> = {
  prefix: 'tw-',
}

export const twMerge = extendTailwindMerge(twMergeConfig)
