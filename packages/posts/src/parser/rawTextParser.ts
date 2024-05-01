/**
 * Split the first line as title and the rest as body
 * @param rawText
 */
export function parseTitleAndBody(rawText: string): {
  title: string
  body: string
} {
  const lines = rawText.trim().split('\n')
  const title = lines[0]
  const body = lines.slice(1).join('\n').trim()
  return { title, body }
}

/**
 * Parse a list of key-value pairs separated by colons (allow duplicate keys)
 * @param rawText
 */
export function parseColonSeparatedList(rawText: string): { key: string; value: string }[] {
  const lines = rawText.trim().split('\n')
  const list: { key: string; value: string }[] = []

  for (const line of lines) {
    if (line.includes(':')) {
      // if line has colon, split it into key and value
      const [key, ...values] = line.split(':')
      const value = values.join(':').trim() // trim both sides
      list.push({ key: key.trim(), value })
    } else if (list.length > 0) {
      // if line has no colon, append it to the last value
      list[list.length - 1].value += '\n' + line.trimEnd() // trim right side
    }
  }

  return list.map(({ key, value }) => ({ key, value: value.trim() }))
}

/**
 * Parse a list of key-value pairs separated by colons (disallow duplicate keys)
 * @param rawText
 */
export function parseColonSeparatedDict(rawText: string): Record<string, string> {
  const list = parseColonSeparatedList(rawText)

  // remove duplicate keys
  const dict: { [key: string]: string } = {}
  for (const { key, value } of list) {
    dict[key] = value
  }
  return dict
}

/**
 * Parse a list of objects separated by three or more dashes
 * @param rawText
 */
export function parseObjectList(rawText: string): Record<string, string>[] {
  const rawObjects = `\n${rawText.trim()}\n`.split(/\n-{3,}\n/)
  const objects = rawObjects
    .map(rawObject => rawObject.trim())
    .filter(Boolean) // remove object
    .map(parseColonSeparatedDict)
  return objects
}
