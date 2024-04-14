import * as React from 'react'

import { retrieveAllPostSlugs } from '@blog/_lib/load'

export const dynamicParams = false

type PageProps = {
  params: {
    slug: string
    options?: string[]
  }
}

export async function generateStaticParams() {
  const slugs = await retrieveAllPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export default function Layout(props: { children: React.ReactNode }) {
  return props.children
}
