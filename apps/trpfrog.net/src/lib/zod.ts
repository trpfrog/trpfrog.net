import { z } from 'zod'

/**
 * Create a ZodEnum from the keys of an object.
 * Original: https://github.com/colinhacks/zod/discussions/839
 */
export function zodEnumFromObjKeys<K extends string>(
  obj: Record<K, unknown>,
): z.ZodEnum<[K, ...K[]]> {
  const [firstKey, ...otherKeys] = Object.keys(obj) as K[]
  return z.enum([firstKey, ...otherKeys])
}
