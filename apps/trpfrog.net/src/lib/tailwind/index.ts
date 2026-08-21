// oxlint-disable-next-line eslint/no-restricted-imports
import { createTV } from 'tailwind-variants'
// oxlint-disable-next-line eslint/no-restricted-imports
export { cn as twMerge, cx as twJoin } from 'tailwind-variants'
// oxlint-disable-next-line eslint/no-restricted-imports
export type { VariantProps as TVVariantProps } from 'tailwind-variants'

export * from './helpers'

export const tv = createTV({})
