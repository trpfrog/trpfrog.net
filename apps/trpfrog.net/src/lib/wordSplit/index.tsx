'use client'

import { createContext, use, useLayoutEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import type { ParseWithBudouXProps } from '@/lib/wordSplit/wordSplit'

// Hack to pass props to loading() of dynamic import
const LoadingPropsContext = createContext<ParseWithBudouXProps | null>(null)

const SSRSafeParseWithBudouX = dynamic(
  () =>
    import('./wordSplit').then(m => ({
      default: m._ParseWithBudouX,
    })),
  {
    ssr: false,
    loading: () => {
      function InnerLoadingParseWithBudouX() {
        const props = use(LoadingPropsContext)
        return props ? <span>{props.str}</span> : <></>
      }
      return <InnerLoadingParseWithBudouX />
    },
  },
)

// due to this is not compatible with SSR, we need to use dynamic import
export function ParseWithBudouX(props: ParseWithBudouXProps) {
  const [supportsWordBreakAutoPhrase, setSupportsWordBreakAutoPhrase] = useState(false)
  useLayoutEffect(() => {
    setSupportsWordBreakAutoPhrase(CSS.supports('word-break', 'auto-phrase'))
  }, [])
  return supportsWordBreakAutoPhrase ? (
    <span style={{ wordBreak: 'auto-phrase' }}>{props.str}</span>
  ) : (
    <LoadingPropsContext value={props}>
      <SSRSafeParseWithBudouX {...props} />
    </LoadingPropsContext>
  )
}
