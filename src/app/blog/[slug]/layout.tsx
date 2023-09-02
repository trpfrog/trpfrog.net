// Trick for NEXT-1214
// export const dynamicParams = false
import { getAllPostSlugs } from '@blog/_lib/load'
import React from 'react'

const dynamicParams = false
export { dynamicParams }

type PageProps = {
  params: {
    slug: string
    options?: string[]
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export default function Layout(props: { children: React.ReactNode }) {
  return props.children
}
