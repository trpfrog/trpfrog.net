import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { ImagePicker, NumberField, SubmitButton, TextInput } from './FormControls'

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

  it('ignores an emptied field', async () => {
    const onValueChange = vi.fn<(value: number) => void>()
    render(<NumberField label="px" value={57} onValueChange={onValueChange} />)
    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: 'px' }), { target: { value: '' } })
    })
    expect(onValueChange).not.toHaveBeenCalled()
  })
})

describe('ImagePicker', () => {
  it('passes the chosen image to onPick', async () => {
    const onPick = vi.fn<(file: File) => void>()
    const { container } = render(<ImagePicker onPick={onPick}>画像を選択</ImagePicker>)
    expect(screen.getByRole('button', { name: '画像を選択' })).toBeInTheDocument()

    const file = new File(['x'], 'icon.png', { type: 'image/png' })
    const input = container.querySelector('input[type="file"]')
    if (!(input instanceof HTMLInputElement)) throw new Error('file input not found')
    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } })
    })

    expect(onPick).toHaveBeenCalledExactlyOnceWith(file)
    expect(screen.getByText('icon.png')).toBeInTheDocument()
  })
})
