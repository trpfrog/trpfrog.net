import type { ImageBrief } from '../entities/generation-result'

// 固定文に波括弧の語が入っても段落が消えないよう、置き換えるのはこのキーだけにする
const PLACEHOLDER = /\{(theme|scene|style|composition)\}/g

/**
 * SKILL.md の「## Prompt template」にある ```text コードブロックをテンプレートとして、
 * 画像プロンプトを組み立てる関数を作る。
 * {theme} などを埋め、値のないプレースホルダーを含む段落は段落ごと省く。
 */
export function createTsmamiPromptBuilder(
  skillMarkdown: string,
): (caption: string, brief?: ImageBrief) => string {
  const template = /^## Prompt template\s*```text\n([\s\S]*?)\n```/m
    .exec(skillMarkdown.replaceAll('\r\n', '\n'))
    ?.at(1)
  if (template == null) {
    throw new Error('Prompt template not found in SKILL.md')
  }
  const paragraphs = template.split('\n\n')

  return (caption, brief) => {
    const values: Record<string, string | undefined> = { theme: caption, ...brief }
    return paragraphs
      .flatMap(paragraph => {
        let missing = false
        // 型定義上 replacer の引数は string | number になる
        const filled = paragraph.replace(PLACEHOLDER, (_match, key: string | number) => {
          const value = values[String(key)]
          if (value == null) missing = true
          return value ?? ''
        })
        return missing ? [] : [filled]
      })
      .join('\n\n')
  }
}
