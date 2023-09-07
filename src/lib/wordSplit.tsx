'use client'

import { loadDefaultJapaneseParser } from 'budoux'
const budouXParser = loadDefaultJapaneseParser()

export const parseWithBudouX = (str: string, slug: string) => {
  if (!str) return []
  const separator = '<%FORCE-BREAK%>'
  return budouXParser
    .parse(str)
    .map(e => {
      e = e.replaceAll('+', `${separator}+${separator}`)
      return e.split(separator)
    })
    .flat()
    .map((e, i) => (
      <span key={`${slug}-${i}`} style={{ display: 'inline-block' }}>
        {e.replaceAll(' ', '\u00a0')} {/* &nbsp; */}
      </span>
    ))
}

export function ParseWithBudouX(props: { str: string; slug: string }) {
  return <>{parseWithBudouX(props.str, props.slug)}</>
}
