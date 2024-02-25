import assert from 'assert'

export function clamp(x: number, min: number, max: number): number {
  assert(min <= max)
  if (x < min) return min
  if (x > max) return max
  return x
}

export function calcMonospacedTextWidth(text: string): number {
  // Consider ASCII figures and half-width kana as half-width figures
  const doubledSizes = text.replace(/[\x20-\x7e ｦ-ﾟ]/g, '').length
  return text.length + doubledSizes
}

export function sortWithDates(
  a: `${number}/${number}/${number}`,
  b: `${number}/${number}/${number}`,
) {
  const aDate = a.split('/').map(Number) as [number, number, number]
  const bDate = b.split('/').map(Number) as [number, number, number]
  if (aDate[0] !== bDate[0]) {
    return bDate[0] - aDate[0]
  }
  if (aDate[1] !== bDate[1]) {
    return bDate[1] - aDate[1]
  }
  return bDate[2] - aDate[2]
}

export function getTypedKeys<T extends Record<PropertyKey, unknown>>(
  obj: T,
): (keyof T)[] {
  return Object.keys(obj)
}

export function getTypedEntries<T extends Record<PropertyKey, unknown>>(
  obj: T,
): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][]
}

export function replaceWithLighterImageFormat(srcUrl: string) {
  const expectedImageExt = /\.(png|jpe?g|webp|gif|avif)$/
  srcUrl = srcUrl.replace(expectedImageExt, '')
  return srcUrl + '.avif'
}
