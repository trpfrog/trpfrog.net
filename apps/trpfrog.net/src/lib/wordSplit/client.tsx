'use client'
import { loadDefaultJapaneseParser } from 'budoux'

import { BudouXCommon, parseUsingBudouxParser } from './common'
const budouXParser = loadDefaultJapaneseParser()

export function useBudouX(text: string) {
  return parseUsingBudouxParser(budouXParser.parse, text)
}

export function BudouXClient(props: { text: string }) {
  return <BudouXCommon text={props.text} parser={budouXParser.parse} />
}
