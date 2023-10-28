import dynamic from 'next/dynamic'

// due to this is not compatible with SSR, we need to use dynamic import
export const ParseWithBudouX = dynamic(
  () => import('./wordSplit').then(m => m._ParseWithBudouX),
  { ssr: false },
)
