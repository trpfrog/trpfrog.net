import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { ImagePicker } from './ImagePicker'

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
