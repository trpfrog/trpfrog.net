import * as React from 'react'

import { H2, HorizontalRule } from '@/components/wrappers'

import type { MDXComponents } from 'mdx/types'

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,

    h2: props => {
      // props contains legacyRef, so we need to remove it.
      const { ref, ...rest } = props
      return <H2 {...rest} />
    },

    hr: props => {
      const { ref, ...rest } = props
      return <HorizontalRule {...rest} />
    },
  }
}
