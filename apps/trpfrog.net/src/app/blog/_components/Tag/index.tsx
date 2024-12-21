import Link from 'next/link'

import styles from './index.module.scss'

const getTagEmoji = (tag: string) => {
  const tags = {
    うどん: '🌾',
    つまみネット: '🟢',
    オタク: '🤓',
    大学: '🎓',
    徒歩: '🚶‍',
    登山: '⛰',
    ドライブ: '🚗',
    自転車: '🚲',
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

const getEmojiUrlFromTagName = (tag: string) => {
  const codePoint = getTagEmoji(tag).codePointAt(0)?.toString(16)
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${codePoint}.svg`
}

type Props = {
  tag: string
  wrappedWithLink?: boolean
}

export const Tag = ({ tag, wrappedWithLink }: Props) => {
  const content = (
    <>
      <span className={styles.emoji}>
        <img src={getEmojiUrlFromTagName(tag)} width={20} height={20} alt={'tag emoji'} />
      </span>
      <span className={styles.name}>{tag}</span>
    </>
  )

  return wrappedWithLink ? (
    <Link href={'/blog/tags/' + tag} key={tag} className={styles.block}>
      {content}
    </Link>
  ) : (
    <div key={tag} className={styles.block}>
      {content}
    </div>
  )
}
