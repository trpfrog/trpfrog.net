import { BuiltinLanguage, type BundledLanguage } from 'shiki'

const languageCode = [
  'js',
  'ts',
  'sh',
  'html',
  'yaml',
  'css',
  'scss',
  'tsx',
  'jsx',
  'json',
  'go',
  'markdown',
  // shiki built-in languages
  'text',
  'ansi',
] as const satisfies (BundledLanguage | 'text' | 'ansi')[]

export type LanguageCode = (typeof languageCode)[number]

const languageCodeMap: Record<Lowercase<string>, LanguageCode> = {
  ...Object.fromEntries(languageCode.map(lang => [lang, lang])),
  javascript: 'js',
  typescript: 'ts',
  shell: 'sh',
  txt: 'text',
  md: 'markdown',
}

export function toLanguageCode(name: string): LanguageCode | null {
  const lowerName = name.toLowerCase() as Lowercase<string>
  return languageCodeMap[lowerName] ?? null
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('toLanguageCode', () => {
    const cases: [string, LanguageCode | null][] = [
      ['javascript', 'js'],
      ['js', 'js'],
      ['typescript', 'ts'],
      ['ts', 'ts'],
      ['shell', 'sh'],
      ['sh', 'sh'],
      ['html', 'html'],
      ['yaml', 'yaml'],
      ['css', 'css'],
      ['scss', 'scss'],
      ['tsx', 'tsx'],
      ['jsx', 'jsx'],
      ['json', 'json'],
      ['text', 'text'],
      ['txt', 'text'],
      ['unknownlang', null],
    ]
    cases.forEach(([input, expected]) => {
      it(`should return "${expected}" for "${input}"`, () => {
        expect(toLanguageCode(input)).toBe(expected)
      })
    })
  })
}
