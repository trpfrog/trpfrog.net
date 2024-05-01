import { createURL } from './url.ts'

describe('createURL', () => {
  test('with no params', () => {
    const url = createURL('/foo', 'https://example.com')
    expect(url).toBe('https://example.com/foo')
  })

  test('with a param', () => {
    const url = createURL('/foo', 'https://example.com', { bar: 'baz' })
    expect(url).toBe('https://example.com/foo?bar=baz')
  })

  test('with multiple params', () => {
    const url = createURL('/foo', 'https://example.com', {
      bar: 'baz',
      qux: 'quux',
      hoge: 'fuga',
    })
    expect(url).toBe('https://example.com/foo?bar=baz&qux=quux&hoge=fuga')
  })

  test('with undefined params', () => {
    const url = createURL('/foo', 'https://example.com', { bar: undefined })
    expect(url).toBe('https://example.com/foo')
  })

  test('with hash', () => {
    const url = createURL('/foo', 'https://example.com', null, 'hash')
    expect(url).toBe('https://example.com/foo#hash')
  })

  test('with hash and params', () => {
    const url = createURL('/foo', 'https://example.com', { bar: 'baz' }, 'hash')
    expect(url).toBe('https://example.com/foo?bar=baz#hash')
  })
})
