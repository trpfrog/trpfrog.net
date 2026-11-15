'use client'
import { useEffect } from 'react'

import type { createAgent } from '@ui-sdk/react/agent'

// createAgent には破棄の手段がないので、StrictMode で effect が 2 回走っても 1 つだけ作る
let agent: ReturnType<typeof createAgent> | undefined

/**
 * ページ上の ui-sdk コンポーネントを、WebMCP 対応ブラウザのエージェントへ
 * snapshot / query / act ツールとして公開する
 */
export function AgentBridge() {
  useEffect(() => {
    // 非対応のブラウザでは、連携のコードを読み込まず、コンポーネントの追跡も始めない
    if (!('modelContext' in document)) return

    let unmounted = false
    let unregister: (() => void) | undefined
    import('@ui-sdk/react/agent')
      .then(({ createAgent, registerTools }) => {
        if (unmounted) return
        agent ??= createAgent()
        // サイトのボタンや入力には重大な副作用がないので、どの操作も確認なしで許す
        unregister = registerTools(agent, { allow: () => true })
      })
      // 連携がなくてもサイトは使えるので、読み込めなかったら知らせるだけにする
      .catch((error: unknown) => console.warn('WebMCP の連携を読み込めませんでした', error))
    return () => {
      unmounted = true
      unregister?.()
    }
  }, [])

  return null
}
