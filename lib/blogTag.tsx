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
        case 'お出かけ': return '🚃'
        default: return '🏷'
    }
}

export const getEmojiImageSrc = (tag: string) => {
    const codePoint = getTagEmoji(tag).codePointAt(0)?.toString(16)
    return `https://twemoji.maxcdn.com/v/latest/svg/${codePoint}.svg`
}
