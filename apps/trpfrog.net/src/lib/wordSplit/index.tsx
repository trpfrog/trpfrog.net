'use client'

import { createContext, use, useLayoutEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import type { ParseWithBudouXProps } from '@/lib/wordSplit/wordSplit'

// Hack to pass props to loading() of dynamic import
const LoadingPropsContext = createContext<ParseWithBudouXProps | null>(null)

const SSRSafeParseWithBudouX = dynamic(() => import('./wordSplit').then(m => m._ParseWithBudouX), {
  ssr: false,
  loading: () => {
    function InnerLoadingParseWithBudouX() {
      const props = use(LoadingPropsContext)
      return props ? <span>{props.str}</span> : <></>
    }
    return <InnerLoadingParseWithBudouX />
  },
})

// due to this is not compatible with SSR, we need to use dynamic import
export function ParseWithBudouX(props: ParseWithBudouXProps) {
  const [supportsWordBreakAutoPhrase, setSupportsWordBreakAutoPhrase] = useState(false)
  useLayoutEffect(() => {
    setSupportsWordBreakAutoPhrase(CSS.supports('word-break', 'auto-phrase'))
  }, [])
  return supportsWordBreakAutoPhrase ? (
    // @ts-expect-error - auto-phrase is not supported by most browsers
    <span style={{ wordBreak: 'auto-phrase' }}>{props.str}</span>
  ) : (
    // @ts-expect-error - You can omit. Provider in React 19
    <LoadingPropsContext value={props}>
      <SSRSafeParseWithBudouX {...props} />
    </LoadingPropsContext>
  )
}
