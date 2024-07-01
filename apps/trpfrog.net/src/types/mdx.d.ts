declare module '*.mdx' {
  let MDXComponent: (props: unknown) => JSX.Element
  // eslint-disable-next-line no-restricted-exports
  export default MDXComponent
}
