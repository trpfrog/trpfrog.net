import * as React from 'react'

import { InlineLink } from '@/components/atoms/InlineLink'
import { H2, H3, H4, H5, HorizontalRule, Kbd } from '@/components/wrappers'

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

    h3: props => {
      const { ref, ...rest } = props
      return <H3 {...rest} />
    },

    h4: props => {
      const { ref, ...rest } = props
      return <H4 {...rest} />
    },

    h5: props => {
      const { ref, ...rest } = props
      return <H5 {...rest} />
    },

    hr: props => {
      const { ref, ...rest } = props
      return <HorizontalRule {...rest} />
    },

    a: props => {
      const { ref, ...rest } = props
      return <InlineLink {...rest} />
    },

    kbd: props => {
      const { ref, ...rest } = props
      return <Kbd {...rest} />
    },
  }
}
