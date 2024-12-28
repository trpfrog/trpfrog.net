export function removePrefixFromKeys<P extends string, T extends Record<`${P}${string}`, unknown>>(
  prefix: P,
  obj: T,
) {
  const regex = new RegExp(`^${prefix}`)
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.replace(regex, ''), value]),
  ) as {
    [K in keyof T as K extends `${P}${string}` ? (K extends `${P}${infer U}` ? U : K) : K]: T[K]
  }
}

export function removeSuffixFromKeys<S extends string, T extends Record<`${string}${S}`, unknown>>(
  suffix: S,
  obj: T,
) {
  const regex = new RegExp(`${suffix}$`)
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.replace(regex, ''), value]),
  ) as {
    [K in keyof T as K extends `${string}${S}` ? (K extends `${infer U}${S}` ? U : K) : K]: T[K]
  }
}

export function typedObjectEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}
