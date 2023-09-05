/**
 * This is a wrapper for MathJax to prevent the Server Component error.
 */

'use client'

import React from 'react'

import {
  MathJax,
  MathJaxContext,
  MathJaxContextProps,
  MathJaxProps,
} from 'better-react-mathjax'

export function MathJaxContextWrapper(props: MathJaxContextProps) {
  return <MathJaxContext {...props} />
}

export function MathJaxWrapper(
  props: MathJaxProps & { children: React.ReactNode },
) {
  return <MathJax {...props} />
}
