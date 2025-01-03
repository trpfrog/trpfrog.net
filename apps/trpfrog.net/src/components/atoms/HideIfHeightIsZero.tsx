'use client'

export function HideIfTooShort(props: { children: React.ReactNode; eps?: number }) {
  return (
    <div
      className="tw-rounded-lg tw-border tw-border-trpfrog-500"
      ref={node => {
        // 高さ 0 だったら非表示にする
        if (!node) return

        const height = node.getBoundingClientRect().height
        if (height < (props.eps ?? 5)) {
          node.style.display = 'none'
        }
        return () => {
          node.style.display = 'block'
        }
      }}
    >
      {props.children}
    </div>
  )
}
