export function tryOr<T>(fn: () => T, fallback: T): T {
  try {
    return fn()
  } catch {
    return fallback
  }
}

export function tryOrElse<T>(fn: () => T, fallbackFn: () => T): T {
  try {
    return fn()
  } catch {
    return fallbackFn()
  }
}
