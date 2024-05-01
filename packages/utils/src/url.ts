export function createURL(
  path: string,
  base: string | undefined,
  params?: Record<string, string | undefined> | null,
  hash?: string | null,
): string {
  const url = new URL(path, base)
  if (typeof params !== 'undefined') {
    Object.entries(params ?? {}).forEach(
      ([k, v]) => typeof v !== 'undefined' && url.searchParams.append(k, v),
    )
  }
  if (typeof hash !== 'undefined' && hash !== null) {
    url.hash = hash
  }
  return url.toString()
}
