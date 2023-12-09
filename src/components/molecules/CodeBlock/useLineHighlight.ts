import React from 'react'

import styles from './index.module.scss'

export function useLineHighlight(lines: {
  errorLines?: number[]
  warningLines?: number[]
  infoLines?: number[]
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  const { errorLines, warningLines, infoLines } = lines
  React.useEffect(() => {
    if (ref.current) {
      const lines = ref.current?.children
      if (lines) {
        for (let i = 0; i < lines.length; i++) {
          if (errorLines?.includes(i + 1)) {
            lines[i].classList.add(styles.error_line)
          } else if (warningLines?.includes(i + 1)) {
            lines[i].classList.add(styles.warning_line)
          } else if (infoLines?.includes(i + 1)) {
            lines[i].classList.add(styles.info_line)
          }
        }
      }
    }

    // Copy ref.current to a local variable to avoid rewritten when cleanup
    const refCurrent = ref.current
    return () => {
      const highlightedLines = [
        errorLines ?? [],
        warningLines ?? [],
        infoLines ?? [],
      ].flat()

      if (refCurrent) {
        highlightedLines.forEach(line => {
          refCurrent.children?.[line - 1]?.classList.remove(
            styles.error_line,
            styles.warning_line,
            styles.info_line,
          )
        })
      }
    }
  }, [errorLines, warningLines, infoLines])

  return ref
}
