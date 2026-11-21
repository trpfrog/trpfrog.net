/**
 * CSS の長さをピクセル値に変換する (e.g. '1em' => 16)
 */
export function measureCSSLength(container: HTMLElement, cssValue: string | number): number {
  if (typeof cssValue === 'number') {
    return cssValue
  }
  // 一瞬だけ DOM に追加して高さを取得する
  const tmp = document.createElement('div')
  tmp.style.height = cssValue
  container.appendChild(tmp)
  const height = tmp.clientHeight
  container.removeChild(tmp)
  return height
}
