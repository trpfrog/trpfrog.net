import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { LabelledCheckbox } from './LabelledCheckbox'

function renderCheckbox(props: Partial<React.ComponentProps<typeof LabelledCheckbox>> = {}) {
  const onChange = vi.fn<(value: boolean) => void>()
  render(
    <LabelledCheckbox checked={false} onChange={onChange} {...props}>
      ヘッダを追従させる
    </LabelledCheckbox>,
  )
  return { onChange, checkbox: screen.getByRole('checkbox', { name: 'ヘッダを追従させる' }) }
}

describe('LabelledCheckbox', () => {
  it('names the checkbox with its label', () => {
    const { checkbox } = renderCheckbox()
    expect(checkbox).toBeInTheDocument()
  })

  it('shows a checked checkbox when checked', () => {
    const { checkbox } = renderCheckbox({ checked: true })
    expect(checkbox).toBeChecked()
  })

  it('shows an unchecked checkbox when not checked', () => {
    const { checkbox } = renderCheckbox({ checked: false })
    expect(checkbox).not.toBeChecked()
  })

  it.each([
    { checked: false, next: true },
    { checked: true, next: false },
  ])('calls onChange($next) when the checkbox is pressed', async ({ checked, next }) => {
    const { checkbox, onChange } = renderCheckbox({ checked })
    await act(async () => {
      checkbox.click()
    })
    expect(onChange).toHaveBeenCalledExactlyOnceWith(next)
  })

  it('calls onChange when the label text is pressed', async () => {
    const { onChange } = renderCheckbox()
    await act(async () => {
      fireEvent.click(screen.getByText('ヘッダを追従させる'))
    })
    expect(onChange).toHaveBeenCalledExactlyOnceWith(true)
  })

  it('stays controlled by its checked prop', async () => {
    const { checkbox } = renderCheckbox({ checked: false })
    await act(async () => {
      checkbox.click()
    })
    expect(checkbox).not.toBeChecked()
  })

  it('is a native button, so Space and Enter press it', () => {
    const { checkbox } = renderCheckbox()
    expect(checkbox.tagName).toBe('BUTTON')
    expect(checkbox).toHaveAttribute('type', 'button')
  })

  it('stays unchanged while disabled', async () => {
    const { checkbox, onChange } = renderCheckbox({ disabled: true })
    expect(checkbox).toBeDisabled()
    await act(async () => {
      checkbox.click()
      fireEvent.click(screen.getByText('ヘッダを追従させる'))
    })
    expect(onChange).not.toHaveBeenCalled()
  })
})
