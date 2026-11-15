import { act, render } from '@testing-library/react'
import { expect, it, vi } from 'vite-plus/test'

import { AgentBridge } from './AgentBridge'

// AgentBridge は連携をモジュールに 1 つだけ持ち、他のテストで作ったものが残ると
// 確かめられないので、このテストだけ別のファイルにしている
const createAgent = vi.hoisted(() => vi.fn<typeof import('@ui-sdk/react/agent').createAgent>())
vi.mock('@ui-sdk/react/agent', async importOriginal => {
  const actual = await importOriginal<typeof import('@ui-sdk/react/agent')>()
  createAgent.mockImplementation(actual.createAgent)
  return { ...actual, createAgent }
})

it('does nothing in a browser without WebMCP', async () => {
  render(<AgentBridge />)
  // AgentBridge が同じモジュールを import していれば、その then はここより先に走る
  await act(async () => {
    await import('@ui-sdk/react/agent')
  })
  expect(createAgent).not.toHaveBeenCalled()
})
