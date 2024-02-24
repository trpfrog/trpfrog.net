import React from 'react'

import { bundledLanguages, getHighlighter as shikiGetHighlighter } from 'shiki'

export const getHighlighter = React.cache(async (language: string) => {
  if (!Object.keys(bundledLanguages).includes(language)) {
    language = 'plaintext'
  }
  return await shikiGetHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: [language],
  })
})
