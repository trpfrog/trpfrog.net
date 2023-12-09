export function parseDataLine(dataLine: string): number[] {
  // syntax: (<number> | <number>-<number>), ...
  return dataLine
    .split(',')
    .map(line => {
      if (line.includes('-')) {
        const [start, end, ...rest] = line.split('-').map(n => parseInt(n, 10))
        if (rest.length > 0) {
          // invalid input
          return []
        }
        if (isNaN(start) || isNaN(end)) {
          return []
        }
        return Array.from({ length: end - start + 1 }, (_, i) => start + i)
      } else {
        const parsed = parseInt(line, 10)
        return isNaN(parsed) ? [] : [parsed]
      }
    })
    .flat()
}
