import { MDXComponents } from 'mdx/types'
import ReactMarkdown from 'react-markdown'

type InnerCamelToKebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T>
      ? '-'
      : ''}${Lowercase<T>}${InnerCamelToKebabCase<U>}`
  : S

export type CamelToKebabCase<S extends string> = InnerCamelToKebabCase<
  Uncapitalize<S>
>

export type PropertyIntersect<T, U> = Pick<T, Extract<keyof T, keyof U>>

type ReactMarkdownComponent = Parameters<typeof ReactMarkdown>[0]['components']

export type IsomorphicMarkdownComponent = {
  [K in keyof PropertyIntersect<
    MDXComponents,
    ReactMarkdownComponent
  >]: MDXComponents[K] extends ReactMarkdownComponent[K]
    ? ReactMarkdownComponent[K] extends MDXComponents[K]
      ? ReactMarkdownComponent[K]
      : never
    : never
}

export type SelectedRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>
