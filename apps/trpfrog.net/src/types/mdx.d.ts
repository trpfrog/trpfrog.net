import type { JSX } from 'react'
declare module '*.mdx' {
  let MDXComponent: (props: unknown) => JSX.Element
  // oxlint-disable-next-line eslint/no-restricted-exports
  export default MDXComponent
}
