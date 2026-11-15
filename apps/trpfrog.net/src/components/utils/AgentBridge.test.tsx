import { act, render, screen } from '@testing-library/react'
import { Button } from '@ui-sdk/react/button'
import { Toggle } from '@ui-sdk/react/toggle'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { AgentBridge } from './AgentBridge'

interface RegisteredTool {
  name: string
  execute: (input: unknown) => Promise<unknown>
}

// WebMCP 対応ブラウザが持つ document.modelContext の代わり
function stubModelContext() {
  const tools = new Map<string, RegisteredTool>()
  const signals: AbortSignal[] = []
  const registerTool = (tool: RegisteredTool, options: { signal: AbortSignal }) => {
    tools.set(tool.name, tool)
    signals.push(options.signal)
    return Promise.resolve()
  }
  Object.defineProperty(document, 'modelContext', {
    configurable: true,
    value: { registerTool },
  })
  return { tools, signals }
}

function Page(props: { onPress?: () => void }) {
  return (
    <>
      <AgentBridge />
      <Toggle aria-label="ミュート" />
      <Button onClick={props.onPress}>送信</Button>
    </>
  )
}

describe('AgentBridge', () => {
  afterEach(() => {
    Reflect.deleteProperty(document, 'modelContext')
  })

  it('registers snapshot, query and act, and unregisters them on unmount', async () => {
    const { tools, signals } = stubModelContext()
    const { unmount } = render(<Page />)
    await vi.waitFor(() => expect([...tools.keys()].sort()).toEqual(['act', 'query', 'snapshot']))

    unmount()
    expect(signals.every(signal => signal.aborted)).toBe(true)
  })

  it('lets the agent change values and press buttons', async () => {
    const { tools } = stubModelContext()
    const onPress = vi.fn<() => void>()
    render(<Page onPress={onPress} />)
    const actTool = await vi.waitFor(() => {
      const tool = tools.get('act')
      if (!tool) throw new Error('act is not registered yet')
      return tool
    })

    const result = await act(() =>
      actTool.execute({
        steps: [
          { ref: 'ミュート', action: 'setPressed', args: [true] },
          { ref: '送信', action: 'press' },
        ],
      }),
    )

    expect(result).toMatchObject({ ok: true })
    expect(screen.getByRole('button', { name: 'ミュート' })).toHaveAttribute('aria-pressed', 'true')
    expect(onPress).toHaveBeenCalledOnce()
  })
})
