export function createURL(
  path: string,
  base: string | undefined,
  params?: Record<string, string | undefined>,
): string {
  const url = new URL(path, base)
  if (typeof params !== 'undefined') {
    Object.entries(params).forEach(
      ([k, v]) => typeof v !== 'undefined' && url.searchParams.append(k, v),
    )
  }
  return url.toString()
}
