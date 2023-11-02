'use client'

import { loadDefaultJapaneseParser } from 'budoux'
const budouXParser = loadDefaultJapaneseParser()

const parseWithBudouX = (str: string) => {
  if (!str) return []
  const separator = '<%FORCE-BREAK%>'
  return budouXParser
    .parse(str)
    .join(separator)
    .replaceAll('+', `${separator}+${separator}`)
    .replaceAll('(' + separator, '(')
    .replaceAll(separator + ')', ')')
    .replaceAll('(', separator + '(')
    .replaceAll(')', ')' + separator)
    .replaceAll(' ', '\u00a0') // &nbsp;
    .split(separator)
    .filter(Boolean)
    .map((word, i) => (
      <span key={i} style={{ display: 'inline-block' }}>
        {word}
      </span>
    ))
}

// TODO: slug を消す
export function _ParseWithBudouX(props: { str: string; slug: string }) {
  return <>{parseWithBudouX(props.str)}</>
}
