'use client'

import { use } from 'react'

import { LinkCard } from '@/components/organisms/LinkCard/LinkCard'

import type { LinkCardResult } from './ServerStreamLinkCard'

export function ServerStreamedLinkCard_Client(props: {
  promise: Promise<LinkCardResult>
  href: string
}) {
  const ogp = use(props.promise)
  if (!ogp.success) {
    return <LinkCard title={props.href} href={props.href} />
  }
  return (
    <LinkCard
      title={ogp.title}
      description={ogp.description}
      imageUrl={ogp.imageUrl}
      favicon={ogp.favicon}
      href={props.href}
      themeColor={ogp.themeColor}
    />
  )
}
