import { useSyncExternalStore } from 'react'

// ページ遷移で <title> が書き換わったら追従する
function subscribeTitle(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.head, { subtree: true, childList: true, characterData: true })
  return () => observer.disconnect()
}

/**
 * 今のページの <title> から、末尾の ` - サイト名` を除いたものを返す。
 * サーバーでは <title> を読めないので空文字列を返す
 */
export function usePageTitle() {
  return useSyncExternalStore(
    subscribeTitle,
    () => document.title.split(' - ')[0] ?? '',
    () => '',
  )
}
