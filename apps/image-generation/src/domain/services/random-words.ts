export type PartOfSpeech = 'noun' | 'verb' | 'adjective'

/** 品詞ごとの取得語数 */
export type WordMix = Record<PartOfSpeech, number>

export type RandomWordGenerator = (mix: WordMix) => Promise<string[]>
