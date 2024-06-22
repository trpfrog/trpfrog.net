import 'server-only'
import { loadDefaultJapaneseParser } from 'budoux/dist'

import { BudouXCommon, parseUsingBudouxParser } from './common'
const budouXParser = loadDefaultJapaneseParser()

export function BudouXSSR(props: { text: string }) {
  return <BudouXCommon text={props.text} parser={budouXParser.parse} />
}

export function parseWithBudouXOnServer(text: string) {
  return parseUsingBudouxParser(budouXParser.parse, text)
}
