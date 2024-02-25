// eslint-disable-next-line
import { createTV } from 'tailwind-variants'
// eslint-disable-next-line
export * from 'tailwind-variants'
import { twMergeConfig } from '@/lib/tailwind/merge'

export const tv = createTV({
  twMergeConfig,
})
