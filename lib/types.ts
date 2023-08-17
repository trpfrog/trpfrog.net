type InnerCamelToKebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${InnerCamelToKebabCase<U>}`
  : S

export type CamelToKebabCase<S extends string> = InnerCamelToKebabCase<Uncapitalize<S>>
