'use client'

import { createURL } from '@trpfrog.net/utils'

const share = (slug: string) => {
  if (typeof window === 'undefined') return
  const articleURL = 'https://trpfrog.net/blog/' + slug
  const tweetURL = createURL('/intent/tweet', 'https://twitter.com', {
    text: document.title,
    url: articleURL,
  })
  window.open(tweetURL)
}

export function ShareSpan(props: { slug: string; children: React.ReactNode }) {
  return <a onClick={() => share(props.slug)}>{props.children}</a>
}
