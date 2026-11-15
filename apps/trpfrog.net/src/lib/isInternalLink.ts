import { services } from '@trpfrog.net/constants'

export function isInternalLink(href: string): boolean {
  return ['/', '#', 'mailto:', services.website.production, services.website.development].some(
    prefix => prefix != null && href.startsWith(prefix),
  )
}
