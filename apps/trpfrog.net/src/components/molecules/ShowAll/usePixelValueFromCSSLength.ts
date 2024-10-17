// return the pixel value of the CSS length (e.g. '1em' => 16)
import * as React from 'react'

import { useRerender } from '@react-hookz/web'

export const usePixelValueFromCSSLength = (
  ref: React.RefObject<HTMLDivElement | null>,
  cssValue: string | number,
) => {
  // rerender component once to activate ref
  const rerender = useRerender()
  React.useEffect(() => {
    rerender()
  }, [rerender])

  const current = ref.current

  return React.useMemo(() => {
    if (!current) return null
    if (typeof cssValue === 'number') {
      return cssValue
    }
    // 一瞬だけ DOM に追加して高さを取得する
    const tmp = document.createElement('div')
    tmp.style.height = cssValue
    current.appendChild(tmp)
    const height = tmp.clientHeight
    current.removeChild(tmp)
    return height
  }, [cssValue, current])
}
