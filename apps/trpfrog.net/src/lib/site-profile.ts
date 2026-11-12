import { PRODUCTION_ORIGIN, SITE_NAME } from './constants'

/**
 * サイトと著者の情報。JSON-LD やエージェント向け Markdown など、
 * 機械が読む場所で同じ内容を使うためにまとめている。
 */
export const SITE_PROFILE = {
  name: SITE_NAME,
  url: PRODUCTION_ORIGIN,
  description: 'さかなになりたいね',
  language: 'ja',
  author: {
    name: 'つまみ',
    alternateName: ['tsmami', 'trpfrog'],
    jobTitle: 'Web エンジニア',
    description:
      '新卒Webっぽいエンジニア。大学時代、学業そっちのけでWebサイト作りにばかり没頭していたら本当にインターネットになってしまった。',
    email: 'contact@trpfrog.net',
    sameAs: ['https://github.com/trpfrog', 'https://twitter.com/TrpFrog'],
  },
} as const
