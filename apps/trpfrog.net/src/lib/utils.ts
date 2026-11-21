import type { Entries } from 'type-fest'

export function clamp(x: number, min: number, max: number): number {
  if (min > max) throw new RangeError(`min (${min}) must not exceed max (${max})`)
  if (x < min) return min
  if (x > max) return max
  return x
}

export function getTypedEntries<T extends Record<PropertyKey, unknown>>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>
}

export function replaceWithLighterImageFormat(srcUrl: string) {
  const expectedImageExt = /\.(png|jpe?g|webp|gif|avif)$/
  srcUrl = srcUrl.replace(expectedImageExt, '')
  return srcUrl + '.avif'
}
