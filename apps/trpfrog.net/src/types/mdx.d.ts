import type { JSX } from 'react'
declare module '*.mdx' {
  let MDXComponent: (props: unknown) => JSX.Element
  // eslint-disable-next-line eslint-core/no-restricted-exports
  export default MDXComponent
}
