import { act, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { SubmitButton } from './SubmitButton'
import { TextInput } from './TextInput'

describe('TextInput and SubmitButton', () => {
  it('submit the typed text with the form', async () => {
    const onSubmit = vi.fn<(q: FormDataEntryValue | null) => void>()
    render(
      <form
        onSubmit={e => {
          e.preventDefault()
          onSubmit(new FormData(e.currentTarget).get('q'))
        }}
      >
        <TextInput name="q" aria-label="ツイート検索" defaultValue="つまみ" />
        <SubmitButton>検索</SubmitButton>
      </form>,
    )
    expect(screen.getByRole('textbox', { name: 'ツイート検索' })).toHaveValue('つまみ')
    await act(async () => {
      screen.getByRole('button', { name: '検索' }).click()
    })
    expect(onSubmit).toHaveBeenCalledExactlyOnceWith('つまみ')
  })
})
