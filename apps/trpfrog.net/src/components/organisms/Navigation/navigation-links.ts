import { PathString } from './types'

type NavigationLinkRecord = {
  link: PathString
  name: string
  shortName?: string
  showOnNavBar?: boolean
}

/**
 * サイト上部に並ぶナビゲーションバーのリンク一覧
 */
export const NAVIGATION_LINKS: NavigationLinkRecord[] = [
  { link: '/', name: 'Home' },
  { link: '/works', name: 'Works' },
  { link: '/blog', name: 'Blog' },
  { link: '/balloon', name: 'Balloons' },
  { link: '/environment', name: 'Environment', shortName: 'Env' },
  { link: '/stickers', name: 'Stickers' },
  { link: '/icons', name: 'Icons' },
  { link: '/ai-icons', name: 'AI Generated Icons', shortName: 'AI Icons' },
  { link: '/links', name: 'Links', showOnNavBar: false },
  { link: '/download', name: 'Downloads', shortName: 'DLC' },
  {
    link: '/icon-maker',
    name: 'Icon Maker',
    shortName: 'Maker',
    showOnNavBar: false,
  },
  { link: '/walking', name: 'Walking', shortName: 'Walk' },
]
