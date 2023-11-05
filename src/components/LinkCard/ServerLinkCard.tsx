import 'server-only'
import React from 'react'

import ogs from 'open-graph-scraper'

import { LinkCard } from '@/components/LinkCard/LinkCard'

export type LinkCardProps = React.ComponentPropsWithoutRef<'div'> & {
  href: string
}

export async function ServerLinkCard(props: LinkCardProps) {
  const { className, children, href, ...rest } = props
  const { result } = await ogs({ url: href })
  return (
    <LinkCard
      title={result.ogTitle ?? ''}
      description={result.ogDescription}
      href={href}
      imageUrl={result.ogImage?.[0]?.url}
      favicon={result.favicon}
      {...rest}
    />
  )
}
