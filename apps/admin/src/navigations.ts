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
  {
    path: '/ai-demos/prompt',
    displayName: 'AI Prompt Demo',
  },
  {
    path: '/ai-demos/image',
    displayName: 'Text-to-Image Demo',
  },
] satisfies {
  path: Route
  displayName: string
}[]
