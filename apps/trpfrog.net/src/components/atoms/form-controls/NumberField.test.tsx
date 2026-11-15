import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { NumberField } from './NumberField'

describe('NumberField', () => {
  it('is named by its label and shows the value', () => {
    render(<NumberField label="balloons" value={96} onValueChange={() => {}} />)
    expect(screen.getByRole('textbox', { name: 'balloons' })).toHaveValue('96')
  })

  it('reports typed numbers', async () => {
    const onValueChange = vi.fn<(value: number) => void>()
    render(<NumberField label="px" value={57} min={1} max={1000} onValueChange={onValueChange} />)
    const input = screen.getByRole('textbox', { name: 'px' })
    await act(async () => {
      fireEvent.change(input, { target: { value: '120' } })
      fireEvent.blur(input)
    })
    expect(onValueChange).toHaveBeenLastCalledWith(120)
  })

  it.each([
    { typed: '5000', expected: 1000 },
    { typed: '0', expected: 1 },
  ])('clamps $typed to $expected', async ({ typed, expected }) => {
    const onValueChange = vi.fn<(value: number) => void>()
    render(<NumberField label="px" value={57} min={1} max={1000} onValueChange={onValueChange} />)
    const input = screen.getByRole('textbox', { name: 'px' })
    await act(async () => {
      fireEvent.change(input, { target: { value: typed } })
      fireEvent.blur(input)
    })
    expect(onValueChange).toHaveBeenLastCalledWith(expected)
  })

  it('ignores an emptied field', async () => {
    const onValueChange = vi.fn<(value: number) => void>()
    render(<NumberField label="px" value={57} onValueChange={onValueChange} />)
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: 'px' }), { target: { value: '' } })
    })
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
