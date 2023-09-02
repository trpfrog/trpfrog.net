import styles from './index.module.scss'
import React from 'react'
import Link from 'next/link'

const getTagEmoji = (tag: string) => {
  const tags = {
    うどん: '🌾',
    つまみネット: '🟢',
    オタク: '🤓',
    大学: '🎓',
    徒歩: '🚶‍',
    登山: '⛰',
    技術: '💻',
    日記: '📔',
    月報: '🗓',
    数学: '📐',
    お出かけ: '🚃',
    長編記事: '📜',
  } as { [tagName: string]: string }

  if (tag in tags) {
    return tags[tag]
  } else {
    return '🏷'
  }
}

export const getEmojiUrlFromTagName = (tag: string) => {
  const codePoint = getTagEmoji(tag).codePointAt(0)?.toString(16)
  return `https://twemoji.maxcdn.com/v/latest/svg/${codePoint}.svg`
}

type Props = {
  tag: string
}

const Tag = ({ tag }: Props) => {
  return (
    // @ts-ignore
    <Link href={'/blog/tags/' + tag} key={tag} className={styles.block}>
      <span className={styles.emoji}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getEmojiUrlFromTagName(tag)}
          width={20}
          height={20}
          alt={'tag emoji'}
        />
      </span>
      <span className={styles.name}>{tag}</span>
    </Link>
  )
}

export default Tag
