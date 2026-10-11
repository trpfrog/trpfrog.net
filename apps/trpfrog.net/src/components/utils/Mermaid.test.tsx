import { renderHook, waitFor } from '@testing-library/react'
import type { MermaidConfig } from 'mermaid'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { useMermaid } from './Mermaid'

const mocks = vi.hoisted(() => ({
  initialize: vi.fn<(config: MermaidConfig) => void>(),
  render: vi.fn<(id: string, chart: string) => Promise<{ svg: string }>>(),
  colorScheme: vi.fn<() => 'light' | 'dark'>(() => 'light'),
}))

vi.mock('mermaid', () => ({
  default: { initialize: mocks.initialize, render: mocks.render },
}))
vi.mock('@/hooks/usePrefersColorScheme', () => ({
  usePrefersColorScheme: mocks.colorScheme,
}))

describe('Mermaid rendering', () => {
  beforeEach(() => {
    mocks.colorScheme.mockReturnValue('light')
    mocks.render.mockReset().mockResolvedValue({ svg: '<svg>図</svg>' })
  })

  it('renders the chart with the light theme and without automatic DOM scanning', async () => {
    const { result } = renderHook(() => useMermaid('graph TD; A-->B'))
    await waitFor(() => expect(result.current).toEqual(['<svg>図</svg>', null]))
    expect(mocks.initialize).toHaveBeenCalledWith(
      expect.objectContaining({ startOnLoad: false, theme: 'forest' }),
    )
    expect(mocks.render).toHaveBeenCalledWith(
      expect.stringMatching(/^mermaid-diagram[^:]+$/),
      'graph TD; A-->B',
    )
  })

  it('rerenders changed charts with the same id and switches to the dark theme', async () => {
    const { result, rerender } = renderHook(({ chart }) => useMermaid(chart), {
      initialProps: { chart: 'graph TD; A-->B' },
    })
    await waitFor(() => expect(result.current[0]).toBe('<svg>図</svg>'))
    const id = mocks.render.mock.calls[0]?.[0]
    expect(id).toBeTypeOf('string')
    mocks.colorScheme.mockReturnValue('dark')
    mocks.render.mockResolvedValue({ svg: '<svg>変更</svg>' })
    rerender({ chart: 'graph TD; B-->C' })
    await waitFor(() => expect(result.current[0]).toBe('<svg>変更</svg>'))
    expect(mocks.render).toHaveBeenLastCalledWith(id, 'graph TD; B-->C')
    expect(mocks.initialize).toHaveBeenLastCalledWith(
      expect.objectContaining({ startOnLoad: false, theme: 'dark' }),
    )
  })

  it('shows development errors and clears them after a successful render', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    try {
      mocks.render.mockRejectedValueOnce(new Error('invalid chart'))
      const { result, rerender } = renderHook(({ chart }) => useMermaid(chart), {
        initialProps: { chart: 'invalid' },
      })
      await waitFor(() => expect(result.current).toEqual([null, 'Error: invalid chart']))
      rerender({ chart: 'graph TD; A-->B' })
      await waitFor(() => expect(result.current).toEqual(['<svg>図</svg>', null]))
    } finally {
      vi.unstubAllEnvs()
    }
  })
})
