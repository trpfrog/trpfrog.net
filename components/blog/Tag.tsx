import styles from "../../styles/blog/Tag.module.scss";
import React from "react";
import Link from "next/link";

const getTagEmoji = (tag: string) => {
    switch (tag) {
        case 'うどん': return '🌾'
        case 'つまみネット': return '🟢'
        case 'オタク': return '🤓'
        case '大学': return '🎓'
        case '徒歩': return '🚶‍'
        case '技術': return '💻'
        case '日記': return '📔'
        case '月報': return '🗓'
        case '数学': return '📐'
        case 'お出かけ': return '🚃'
        case '長編記事': return '📜'
        default: return '🏷'
    }
}

export const getEmojiUrlFromTagName = (tag: string) => {
    const codePoint = getTagEmoji(tag).codePointAt(0)?.toString(16)
    return `https://twemoji.maxcdn.com/v/latest/svg/${codePoint}.svg`
}


type Props = {
    tag: string
}

const Tag = ({tag}: Props) => {
    return (
        <Link href={'/blog/tags/' + tag} key={tag}>
            <a className={styles.block}>
                <span className={styles.emoji}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={getEmojiUrlFromTagName(tag)}
                        width={20}
                        height={20}
                        alt={'tag emoji'}
                    />
                </span>
                <span className={styles.name}>
                    {tag}
                </span>
            </a>
        </Link>
    )
}

export default Tag
