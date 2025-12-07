const TAILWIND_PREFIX_MODIFIER = 'tw'

export function addTwModifier(modifier: `${string}:`, className: string | string[]): string {
  const mod = modifier.slice(0, -1) // 例: 'file:' -> 'file'
  const normalized = Array.isArray(className) ? className.join(' ') : className

  const tokens = normalized.trim().split(/\s+/)
  const result: string[] = []

  for (const token of tokens) {
    if (!token) continue

    const parts: string[] = token.split(':').filter(Boolean)
    const base = parts.pop()
    if (!base) continue

    const hasTwPrefix = parts[0] === TAILWIND_PREFIX_MODIFIER
    const variants = hasTwPrefix ? parts.slice(1) : parts // 最後の要素以外が variant

    const rest = variants.filter(v => v !== mod && v.length > 0) // 重複と空文字を排除

    let orderedVariants: string[]
    if (mod === TAILWIND_PREFIX_MODIFIER) {
      orderedVariants = [TAILWIND_PREFIX_MODIFIER, ...rest]
    } else if (hasTwPrefix) {
      orderedVariants = [TAILWIND_PREFIX_MODIFIER, mod, ...rest]
    } else {
      orderedVariants = [mod, ...rest]
    }

    result.push([...orderedVariants, base].join(':'))
  }

  return result.join(' ')
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('addTwModifier', () => {
    it('modifier を追加できる', () => {
      const result = addTwModifier('file:', 'tw:text-sm')
      expect(result).toBe('tw:file:text-sm')
    })

    it('modifier を複数のクラスに追加できる', () => {
      const result = addTwModifier('file:', 'tw:text-sm  tw:font-bold')
      expect(result).toBe('tw:file:text-sm tw:file:font-bold')
    })

    it('複数バリアントがあっても先頭 (tw prefix を除く) に追加できる', () => {
      const result = addTwModifier('sm:', 'tw:dark:hover:text-sm focus:text-lg')
      expect(result).toBe('tw:sm:dark:hover:text-sm sm:focus:text-lg')
    })

    it('配列に対応できる', () => {
      const result = addTwModifier('hover:', ['tw:text-sm', 'text-lg'])
      expect(result).toBe('tw:hover:text-sm hover:text-lg')
    })

    it('tw-prefix を重複して追加しない', () => {
      const result = addTwModifier('tw:', 'md:hover:text-sm tw:text-lg')
      expect(result).toBe('tw:md:hover:text-sm tw:text-lg')
    })
  })
}
