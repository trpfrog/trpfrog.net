import * as React from 'react'

import { fetchSlugs } from '@blog/rpc'

export async function generateStaticParams() {
  const slugs = await fetchSlugs()
  return slugs.map(slug => ({ slug }))
}

export default function Layout(props: { children: React.ReactNode }) {
  return props.children
}
