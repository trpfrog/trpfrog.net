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

// Find the number of colons used as separators
function extractSeparator(line: string, sepChar = ':') {
  const firstColonPos = line.indexOf(sepChar)
  if (firstColonPos < 0) {
    throw new Error('No separator found')
  }

  let separator = sepChar
  for (let pos = firstColonPos + 1; pos < line.length; pos++) {
    if (line[pos] !== sepChar) {
      break
    }
    separator += sepChar
  }
  return separator
}

/**
 * Parse a list of key-value pairs separated by colons (allow duplicate keys)
 * @param rawText
 */
export function parseColonSeparatedList(rawText: string): { key: string; value: string }[] {
  const lines = rawText.trim().split('\n')
  const list: { key: string; value: string }[] = []
  const separator = extractSeparator(lines[0])

  for (const line of lines) {
    if (line.includes(separator)) {
      // if line has separator, split it into key and value
      const [key, ...values] = line.split(separator)
      const value = values.join(separator).trim() // trim both sides
      list.push({ key: key.trim(), value })
    } else if (list.length > 0) {
      // if line has no separator, append it to the last value
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
 * @example
 * ```
 * key1: value1
 * key2: value2
 * ---
 * key3: value3
 * key4: value4
 * ```
 * returns
 * ```
 * [
 *   { key1: 'value1', key2: 'value2' },
 *   { key3: 'value3', key4: 'value4' }
 * ]
 * ```
 */
export function parseObjectList(rawText: string): Record<string, string>[] {
  const rawObjects = rawText
    .split(/^\s*-{3,}\s*$/m)
    .map(s => s.trim())
    .filter(Boolean)
  return rawObjects.map(parseColonSeparatedDict)
}
