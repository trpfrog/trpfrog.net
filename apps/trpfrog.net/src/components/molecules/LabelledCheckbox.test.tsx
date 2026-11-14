import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { LabelledCheckbox } from './LabelledCheckbox'

describe('LabelledCheckbox', () => {
  it('names the checkbox with its label', () => {
    render(
      <LabelledCheckbox checked={false} onChange={() => {}}>
        ヘッダを追従させる
      </LabelledCheckbox>,
    )
    expect(screen.getByRole('checkbox', { name: 'ヘッダを追従させる' })).toBeInTheDocument()
  })

  it('shows a checked checkbox when checked', () => {
    render(
      <LabelledCheckbox checked onChange={() => {}}>
        label
      </LabelledCheckbox>,
    )
    expect(screen.getByRole('checkbox', { name: 'label' })).toBeChecked()
  })

  it('shows an unchecked checkbox when not checked', () => {
    render(
      <LabelledCheckbox checked={false} onChange={() => {}}>
        label
      </LabelledCheckbox>,
    )
    expect(screen.getByRole('checkbox', { name: 'label' })).not.toBeChecked()
  })

  it.each([
    { checked: false, next: true },
    { checked: true, next: false },
  ])('calls onChange($next) when the checkbox is pressed', async ({ checked, next }) => {
    const onChange = vi.fn<(value: boolean) => void>()
    render(
      <LabelledCheckbox checked={checked} onChange={onChange}>
        label
      </LabelledCheckbox>,
    )
    await act(async () => {
      screen.getByRole('checkbox', { name: 'label' }).click()
    })
    expect(onChange).toHaveBeenCalledExactlyOnceWith(next)
  })

  it('calls onChange when the label text is pressed', async () => {
    const onChange = vi.fn<(value: boolean) => void>()
    render(
      <LabelledCheckbox checked={false} onChange={onChange}>
        label
      </LabelledCheckbox>,
    )
    await act(async () => {
      fireEvent.click(screen.getByText('label'))
    })
    expect(onChange).toHaveBeenCalledExactlyOnceWith(true)
  })

  it('stays unchanged while disabled', async () => {
    const onChange = vi.fn<(value: boolean) => void>()
    render(
      <LabelledCheckbox checked={false} disabled onChange={onChange}>
        label
      </LabelledCheckbox>,
    )
    const checkbox = screen.getByRole('checkbox', { name: 'label' })
    expect(checkbox).toBeDisabled()
    await act(async () => {
      checkbox.click()
      fireEvent.click(screen.getByText('label'))
    })
    expect(onChange).not.toHaveBeenCalled()
  })
})
