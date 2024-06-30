import * as React from 'react'

import { readAllSlugs } from '@trpfrog.net/posts/fs'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await readAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export default function Layout(props: { children: React.ReactNode }) {
  return props.children
}
