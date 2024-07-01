import { DEVELOPMENT_ORIGIN, PRODUCTION_ORIGIN } from '@/lib/constants'

export function isInternalLink(href: string): boolean {
  return ['/', '#', 'mailto:', PRODUCTION_ORIGIN, DEVELOPMENT_ORIGIN].some(prefix =>
    href.startsWith(prefix),
  )
}
