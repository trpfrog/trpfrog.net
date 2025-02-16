import type { Route } from 'next'

export const navigations = [
  {
    path: '/',
    displayName: 'Home',
  },
  {
    path: '/ai-icons',
    displayName: 'AI Icons',
  },
  {
    path: '/revalidate',
    displayName: 'Revalidate',
  },
  {
    path: '/blog',
    displayName: 'Blog',
  },
] satisfies {
  path: Route
  displayName: string
}[]
