import { MDXComponents } from 'mdx/types'

type InnerCamelToKebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T>
      ? '-'
      : ''}${Lowercase<T>}${InnerCamelToKebabCase<U>}`
  : S

export type CamelToKebabCase<S extends string> = InnerCamelToKebabCase<
  Uncapitalize<S>
>

export type PropertyIntersect<T, U> = Pick<T, Extract<keyof T, keyof U>>

/**
 * @deprecated Use `MDXComponents` from `mdx/types` instead
 */
export type IsomorphicMarkdownComponent = MDXComponents

export type SelectedRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>
