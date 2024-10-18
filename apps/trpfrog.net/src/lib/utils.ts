import assert from 'assert'

export function clamp(x: number, min: number, max: number): number {
  assert(min <= max)
  if (x < min) return min
  if (x > max) return max
  return x
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
