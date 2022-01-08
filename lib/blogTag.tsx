import styles from '../styles/blog.module.scss';
import {FunctionComponent} from "react";

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
        default: return '🏷'
    }
}

const getEmojiImageSrc = (tag: string) => {
    const codePoint = getTagEmoji(tag).codePointAt(0)?.toString(16)
    return `https://twemoji.maxcdn.com/v/latest/svg/${codePoint}.svg`
}

export const TagsBlock: FunctionComponent<{tags: string}> = ({tags, children}) => {
    return (
        <>
            {tags.split(',').map((t: string) => t.trim()).concat().map(tag => (
                <div className={styles.tag_block} key={tag}>
                    <div className={styles.tag_emoji}>
                        <img src={getEmojiImageSrc(tag)} width={20} height={20} alt={'tag emoji'}/>
                    </div>
                    <div className={styles.tag_name}>
                        {tag}
                    </div>
                </div>
            ))}
        </>
    )
}
