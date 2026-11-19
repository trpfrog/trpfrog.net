// oxlint-disable-next-line eslint/no-restricted-imports -- tailwind-variants はこのファイル経由で使う
import { createTV } from 'tailwind-variants'
// oxlint-disable-next-line eslint/no-restricted-imports -- tailwind-variants はこのファイル経由で使う
export { cn as twMerge, cx as twJoin } from 'tailwind-variants'
// oxlint-disable-next-line eslint/no-restricted-imports -- tailwind-variants はこのファイル経由で使う
export type { VariantProps as TVVariantProps } from 'tailwind-variants'

export const tv = createTV({})
