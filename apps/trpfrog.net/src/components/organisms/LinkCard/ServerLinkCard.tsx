import 'server-only'
import * as React from 'react'
import { memo } from 'react'

import { withTimeout } from '@trpfrog.net/utils'

import { ClientLinkCard } from '@/components/organisms/LinkCard/ClientLinkCard'
import { LinkCard } from '@/components/organisms/LinkCard/LinkCard'

import { fetchOGP } from './fetchOGP'

export type LinkCardProps = Omit<React.ComponentPropsWithoutRef<'a'>, 'children'> & {
  href: string
  fallbackToClient?: boolean
  fallbackToClientMillis?: number
  overrideProps?: Partial<LinkCardProps>
}

export const ServerLinkCard = memo(async function ServerLinkCard(props: LinkCardProps) {
  const { href, ...rest } = props

  try {
    const result = await withTimeout(fetchOGP(href), props.fallbackToClientMillis ?? 5000)
    return (
      <LinkCard
        title={result.ogTitle ?? ''}
        description={result.ogDescription}
        href={href}
        imageUrl={result.ogImage?.[0]?.url}
        favicon={result.favicon}
        themeColor={result.customMetaTags?.themeColor}
        {...rest}
        {...(props.overrideProps ?? {})}
      />
    )
  } catch (_e) {
    if (props.fallbackToClient) {
      return <ClientLinkCard href={href} {...rest} />
    } else {
      return <LinkCard title={href} href={href} description={href} {...rest} skeleton={false} />
    }
  }
})
