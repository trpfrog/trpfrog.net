import React, {useEffect} from "react";

export default function useOverwritePageNavHref(
  setPageIdx: (idx: number) => void,
  scrollRef: React.RefObject<any>
) {
  useEffect(() => {
    document.querySelectorAll('a[data-page-transfer-to]')
      .forEach((e) => {
        const a = e as HTMLAnchorElement
        const pageIdx = parseInt(a.dataset.pageTransferTo!, 10)
        a.href = '#'
        scrollRef.current.scroll(0, 0)
        a.onclick = () => {
          setPageIdx(pageIdx)
          return false
        }
      })
  })
}
