import { toLanguageCode, type LanguageCode } from './language-code'
import { languageDisplayNames } from './language-display-names'

/**
 * `parseMdCodeBlockLanguageName` の戻り値型。
 *
 * コードブロックの「言語」と「ファイル名」を解析した結果を表します。
 * - `rawLanguage`: 入力から抽出した言語名（trim + 小文字化）。
 * - `languageCode`: サポート対象に正規化された言語コード。未対応の場合は `null`。
 * - `languageDisplayName`: 表示用に整形された言語名（例: js → JavaScript）。
 * - `fileName`: 解析されたファイル名。指定がない場合は `null`。
 *
 * @see toLanguageCode
 * @see getLanguageDisplayName
 */
type ParseResult = {
  rawLanguage: string
  languageCode: LanguageCode | null
  languageDisplayName: string | null
  fileName: string | null
}

/**
 * コードブロックの言語指定とファイル名を 1 本の文字列から解析します。
 *
 * 入力は次のいずれかの形式を受け付けます（優先順）。
 * 1) `language:fileName` 例: `tsx:App.tsx`
 * 2) `fileName.language`（最後のドットを拡張子とみなす）例: `main.go`
 *    - 先頭がドットの「ドットファイル」（例: `.env`）は拡張子扱いしません
 *    - `file.` のように末尾がドットだけの場合は拡張子扱いせず 3) に該当
 * 3) `language` のみ 例: `tsx`
 *
 * ルール:
 * - 言語名は `trim()` し小文字化して取り扱います
 * - `language:fileName` 形式でコロンの後が空でも、`fileName` は空文字として返します
 * - `fileName.language` 形式では、`fileName` の大文字小文字は保持します
 *
 * 戻り値には、元の言語名（小文字化）、正規化された言語コード、
 * 表示用言語名、ファイル名（存在すれば）を含みます。
 *
 * @param input 解析対象の文字列
 * @returns 解析結果オブジェクト
 *
 * @example
 * parseMdCodeBlockLanguageName('tsx:App.tsx')
 * // → { rawLanguage: 'tsx', languageCode: 'tsx', languageDisplayName: 'TSX', fileName: 'App.tsx' }
 *
 * @example
 * parseMdCodeBlockLanguageName('main.go')
 * // → { rawLanguage: 'go', languageCode: null, languageDisplayName: 'Go', fileName: 'main.go' }
 *
 * @example
 * parseMdCodeBlockLanguageName('Go')
 * // → { rawLanguage: 'go', languageCode: 'go', languageDisplayName: 'Go', fileName: null }
 */
export function parseMdCodeBlockLanguageName(input: string): ParseResult {
  const { rawLanguage, fileName } = parseMdCodeBlockLanguageNameRaw(input)
  const languageCode = toLanguageCode(rawLanguage)

  return {
    rawLanguage,
    languageCode,
    languageDisplayName: languageCode ? languageDisplayNames[languageCode] : null,
    fileName,
  }
}

/**
 * 入力から「言語」と「ファイル名」を抽出する下位関数。
 * 文字種の正規化（小文字化）とトリムのみを行い、表示名や言語コード変換はしません。
 *
 * マッチ順:
 * 1) `language:fileName`
 * 2) `fileName.language`（ただし `.env` などのドットファイルは拡張子扱いしない）
 * 3) `language` のみ
 *
 * @param input 解析対象の文字列
 * @returns `{ rawLanguage, fileName }`
 * @example
 * parseMdCodeBlockLanguageNameRaw('md:README.md') // { rawLanguage: 'md', fileName: 'README.md' }
 */
function parseMdCodeBlockLanguageNameRaw(input: string): {
  rawLanguage: string
  fileName: string | null
} {
  const trimmed = input.trim()
  const colonIndex = trimmed.indexOf(':')

  // 1) language:fileName
  if (colonIndex !== -1) {
    const rawLanguage = trimmed.slice(0, colonIndex).trim().toLowerCase()
    const fileName = trimmed.slice(colonIndex + 1).trim()
    return { rawLanguage, fileName }
  }

  // 2) fileName.language（最後のドット）
  const lastDotIndex = trimmed.lastIndexOf('.')
  if (lastDotIndex > 0 && lastDotIndex < trimmed.length - 1) {
    const rawLanguage = trimmed
      .slice(lastDotIndex + 1)
      .trim()
      .toLowerCase()
    return { rawLanguage, fileName: trimmed }
  }

  // 3) language のみ
  return { rawLanguage: trimmed.toLowerCase(), fileName: null }
}

// ==========================================================================================

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('parseMdCodeBlockLanguageName', () => {
    // JSDoc にある分だけ
    const cases: [string, ParseResult][] = [
      [
        'tsx:App.tsx',
        {
          rawLanguage: 'tsx',
          languageCode: 'tsx',
          languageDisplayName: 'TSX',
          fileName: 'App.tsx',
        },
      ],
      [
        'main.go',
        {
          rawLanguage: 'go',
          languageCode: 'go',
          languageDisplayName: 'Go',
          fileName: 'main.go',
        },
      ],
      [
        'Go',
        {
          rawLanguage: 'go',
          languageCode: 'go',
          languageDisplayName: 'Go',
          fileName: null,
        },
      ],
    ]

    it.each(cases)('should parse %s', (input, expected) => {
      expect(parseMdCodeBlockLanguageName(input)).toEqual(expected)
    })
  })

  describe('parseMdCodeBlockLanguageNameRaw', () => {
    type Case = {
      name: string
      input: string
      expected: { rawLanguage: string; fileName: string | null }
    }

    const cases: Case[] = [
      {
        name: 'colon: 基本（tsx:MainCode）',
        input: 'tsx:MainCode',
        expected: { rawLanguage: 'tsx', fileName: 'MainCode' },
      },
      {
        name: 'colon: 大小文字→小文字化',
        input: 'Go:main.go',
        expected: { rawLanguage: 'go', fileName: 'main.go' },
      },
      {
        name: 'colon: ファイル名にコロン含む',
        input: 'md:notes:today',
        expected: { rawLanguage: 'md', fileName: 'notes:today' },
      },
      {
        name: 'colon: 末尾コロンで空文字ファイル名',
        input: 'go:',
        expected: { rawLanguage: 'go', fileName: '' },
      },

      {
        name: 'uppercase: JS → js',
        input: 'JS:file',
        expected: { rawLanguage: 'js', fileName: 'file' },
      },
      {
        name: 'uppercase: Tsx → tsx',
        input: 'Tsx:App',
        expected: { rawLanguage: 'tsx', fileName: 'App' },
      },
      {
        name: 'no alias: Rust は rust',
        input: 'Rust:main.rs',
        expected: { rawLanguage: 'rust', fileName: 'main.rs' },
      },

      {
        name: 'dot: 基本（main.go）',
        input: 'main.go',
        expected: { rawLanguage: 'go', fileName: 'main.go' },
      },
      {
        name: 'dot: 複数ドット（file.name.ts）',
        input: 'file.name.ts',
        expected: { rawLanguage: 'ts', fileName: 'file.name.ts' },
      },
      {
        name: 'dot + uppercase: 大文字拡張子 → 小文字',
        input: 'index.JS',
        expected: { rawLanguage: 'js', fileName: 'index.JS' },
      },

      {
        name: 'dotfile: .env は拡張子扱いしない',
        input: '.env',
        expected: { rawLanguage: '.env', fileName: null },
      },
      {
        name: 'dotfile: .eslintrc も同様',
        input: '.eslintrc',
        expected: { rawLanguage: '.eslintrc', fileName: null },
      },

      { name: 'lang only: tsx', input: 'tsx', expected: { rawLanguage: 'tsx', fileName: null } },
      {
        name: 'lang only: 空白付き → trim + 小文字化',
        input: '  Go  ',
        expected: { rawLanguage: 'go', fileName: null },
      },

      {
        name: 'no ext: "file." はルール3',
        input: 'file.',
        expected: { rawLanguage: 'file.', fileName: null },
      },
    ]

    it.each(cases)('$name', ({ input, expected }) => {
      expect(parseMdCodeBlockLanguageNameRaw(input)).toEqual(expected)
    })
  })
}
