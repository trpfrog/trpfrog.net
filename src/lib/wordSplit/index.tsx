'use client'

import React from 'react'

import dynamic from 'next/dynamic'

import type { ParseWithBudouXProps } from '@/lib/wordSplit/wordSplit'

// Hack to pass props to loading() of dynamic import
const LoadingPropsContext = React.createContext<ParseWithBudouXProps | null>(
  null,
)

const SSRSafeParseWithBudouX = dynamic(
  () => import('./wordSplit').then(m => m._ParseWithBudouX),
  {
    ssr: false,
    loading: () => {
      function InnerLoadingParseWithBudouX() {
        const props = React.useContext(LoadingPropsContext)
        return props ? <span>{props.str}</span> : <></>
      }
      return <InnerLoadingParseWithBudouX />
    },
  },
)

// due to this is not compatible with SSR, we need to use dynamic import
export function ParseWithBudouX(props: ParseWithBudouXProps) {
  return (
    <LoadingPropsContext.Provider value={props}>
      <SSRSafeParseWithBudouX {...props} />
    </LoadingPropsContext.Provider>
  )
}
