import React from 'react'

export const customPrismTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: '#e0e0e0',
    background: 'none',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#e0e0e0',
    background: '#292929',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    margin: '0.5em 0',
    overflow: 'auto',
    borderRadius: '0.3em',
  },
  ':not(pre) > code[class*="language-"]': {
    background: '#292929',
    borderRadius: '0.3em',
    whiteSpace: 'normal',
  },
  comment: {
    color: '#828282',
  },
  prolog: {
    color: '#828282',
  },
  doctype: {
    color: '#828282',
  },
  cdata: {
    color: '#828282',
  },
  punctuation: {
    color: '#999999',
  },
  property: {
    color: '#a8deff',
  },
  tag: {
    color: '#a8deff',
  },
  boolean: {
    color: '#a8deff',
  },
  number: {
    color: '#a8deff',
  },
  constant: {
    color: '#a8deff',
  },
  symbol: {
    color: '#a8deff',
  },
  deleted: {
    color: '#a8deff',
  },
  selector: {
    color: '#ffd53d',
  },
  'attr-name': {
    color: '#ffd53d',
  },
  string: {
    color: '#ffd53d',
  },
  char: {
    color: '#ffd53d',
  },
  builtin: {
    color: '#ffd53d',
  },
  inserted: {
    color: '#ffd53d',
  },
  operator: {
    color: '#ff6b9f',
    // background: '#292929',
  },
  entity: {
    color: '#ff6b9f',
    background: '#292929',
    cursor: 'help',
  },
  url: {
    color: '#ff6b9f',
    // background: '#292929',
  },
  '.language-css string': {
    color: '#ff6b9f',
    // background: '#292929',
  },
  '.style string': {
    color: '#ff6b9f',
    // background: '#292929',
  },
  atrule: {
    color: '#ff6b9f',
  },
  'attr-value': {
    color: '#ff6b9f',
  },
  keyword: {
    color: '#ff6b9f',
  },
  function: {
    color: '#abda59',
  },
  regex: {
    color: '#ffa53d',
  },
  important: {
    color: '#ffa53d',
    fontWeight: 'bold',
  },
  variable: {
    color: '#ffa53d',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
}
