'use client'

import { loadDefaultJapaneseParser } from 'budoux'
const budouXParser = loadDefaultJapaneseParser()

export const parseWithBudouX = (str: string, slug: string) => {
  if (!str) return []
  return budouXParser
    .parse(str)
    .map(e => e.split('+').map((f, i) => (i % 2 === 0 ? f : '+' + f)))
    .flat()
    .map((e, i) => (
      <span key={`${slug}-${i}`} style={{ display: 'inline-block' }}>
        {e}
      </span>
    ))
}

export function ParseWithBudouX(props: { str: string; slug: string }) {
  return <>{parseWithBudouX(props.str, props.slug)}</>
}
