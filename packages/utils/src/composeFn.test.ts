import { composeFunctions, pipeFunctions } from './composeFn'

describe('composeFunctions / pipeFunctions', () => {
  const fn_number_number = (x: number) => x + 1
  const fn_number_string = (x: number) => '1' + x
  const fn_string_number = (x: string) => Number(x) + 2
  const fn_string_string = (x: string) => x + '3'

  describe('string => number => string => number', () => {
    const fns = [fn_string_number, fn_number_string, fn_string_number] as const
    const handcoded = (x: string) => fns[2](fns[1](fns[0](x)))
    const input = '1'
    type ExpectedType = (x: string) => number

    test('composeFunctions', () => {
      const composed = composeFunctions(fns[2], fns[1], fns[0])
      expect(composed(input)).toBe(handcoded(input))
      expectTypeOf(composed).toEqualTypeOf<ExpectedType>()
    })

    test('pipeFunctions', () => {
      const piped = pipeFunctions(fns[0], fns[1], fns[2])
      expect(piped(input)).toBe(handcoded(input))
      expectTypeOf(piped).toEqualTypeOf<ExpectedType>()
    })
  })

  describe('number => number', () => {
    const fns = [fn_number_number] as const
    const handcoded = (x: number) => fns[0](x)
    const input = 1
    type ExpectedType = (x: number) => number

    test('composeFunctions', () => {
      const composed = composeFunctions(fns[0])
      expect(composed(input)).toBe(handcoded(input))
      expectTypeOf(composed).toEqualTypeOf<ExpectedType>()
    })

    test('pipeFunctions', () => {
      const piped = pipeFunctions(fns[0])
      expect(piped(input)).toBe(handcoded(input))
      expectTypeOf(piped).toEqualTypeOf<ExpectedType>()
    })
  })

  describe('string => number => number => string => string => number', () => {
    const fns = [
      fn_string_number,
      fn_number_number,
      fn_number_string,
      fn_string_string,
      fn_string_number,
    ] as const
    const handcoded = (x: string) => fns[4](fns[3](fns[2](fns[1](fns[0](x)))))
    type ExpectedType = (x: string) => number

    test('composeFunctions', () => {
      const composed = composeFunctions(fns[4], fns[3], fns[2], fns[1], fns[0])
      const input = '1'
      expect(composed(input)).toBe(handcoded(input))
      expectTypeOf(composed).toEqualTypeOf<ExpectedType>()
    })

    test('pipeFunctions', () => {
      const piped = pipeFunctions(fns[0], fns[1], fns[2], fns[3], fns[4])
      const input = '1'
      expect(piped(input)).toBe(handcoded(input))
      expectTypeOf(piped).toEqualTypeOf<ExpectedType>()
    })
  })
})
