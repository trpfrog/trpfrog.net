import type { JSX } from 'react'
declare module '*.mdx' {
  let MDXComponent: (props: unknown) => JSX.Element
  // oxlint-disable-next-line eslint/no-restricted-exports -- MDX はコンポーネントを default export で公開する
  export default MDXComponent
}
