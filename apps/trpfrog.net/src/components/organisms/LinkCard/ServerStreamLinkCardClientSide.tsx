'use client'

import useSWRImmutable from 'swr/immutable'

import { LinkCard } from '@/components/organisms/LinkCard/LinkCard'

import { SkeletonLinkCard } from './SkeletonLinkCard'

import type { LinkCardResult } from './ServerStreamLinkCard'

export function ServerStreamedLinkCard_Client(props: {
  fetcher: (url: string) => Promise<LinkCardResult>
  href: string
}) {
  const ogpResult = useSWRImmutable(`ogp:${props.href}`, (url: string) =>
    props.fetcher(url.slice(4)),
  )

  if (ogpResult.isLoading) {
    return <SkeletonLinkCard />
  }

  if (ogpResult.error || !ogpResult.data || !ogpResult.data.success) {
    if (ogpResult.error) {
      console.error(`Failed to fetch OGP for ${props.href}`, ogpResult.error)
    }
    return <LinkCard title={props.href} href={props.href} />
  }

  const ogp = ogpResult.data
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
