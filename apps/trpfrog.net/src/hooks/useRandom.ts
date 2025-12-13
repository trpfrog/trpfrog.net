import { useEffect, useState } from 'react'

type RandomState = { isPending: true; value: null } | { isPending: false; value: number }

function toRandomState(value: number | null): RandomState {
  if (value === null) {
    return { isPending: true, value: null }
  } else {
    return { isPending: false, value }
  }
}

export function useRandom(): RandomState {
  const [value, setValue] = useState<number | null>(null)
  useEffect(() => {
    if (value === null) {
      setValue(Math.random())
    }
  }, [value])

  return toRandomState(value)
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  const { renderHook, waitFor } = await import('@testing-library/react')

  describe('toRandomState', () => {
    it('should return pending state when value is null', () => {
      const result = toRandomState(null)
      expect(result).toEqual({ isPending: true, value: null })
    })

    it('should return resolved state when value is a number', () => {
      const result = toRandomState(0.5)
      expect(result).toEqual({ isPending: false, value: 0.5 })
    })

    it('should return reactive state when value is zero', () => {
      const result = toRandomState(0)
      expect(result).toEqual({ isPending: false, value: 0 })
    })
  })

  describe('useRandom', () => {
    test('value が入った後は再レンダーしても Math.random は呼ばれない', async () => {
      const random = vi.spyOn(Math, 'random').mockReturnValueOnce(0.123)

      const { result, rerender } = renderHook(() => useRandom())
      await waitFor(() => {
        expect(result.current).toEqual({ isPending: false, value: 0.123 })
      })

      rerender()
      expect(result.current).toEqual({ isPending: false, value: 0.123 })
      expect(random).toHaveBeenCalledTimes(1)
    })
  })
}
