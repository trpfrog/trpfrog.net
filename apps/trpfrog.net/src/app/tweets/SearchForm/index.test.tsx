import { act, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vite-plus/test'

import { SearchForm } from '.'

describe('tweets SearchForm', () => {
  it('submits the labelled query as q to the tweets page', async () => {
    render(<SearchForm defaultValue="つまみ" />)
    await act(async () => {})
    const input = screen.getByRole('textbox', { name: 'ツイート検索' })
    expect(input).toHaveValue('つまみ')
    const form = input.closest('form')
    if (!form) throw new Error('form not found')
    expect(form).toHaveAttribute('action', '/tweets#tweets')
    expect(new FormData(form).get('q')).toBe('つまみ')
  })
})
