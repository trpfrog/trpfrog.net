import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { LabelledCheckbox } from './LabelledCheckbox'

async function renderCheckbox(props: Partial<React.ComponentProps<typeof LabelledCheckbox>> = {}) {
  const onChange = vi.fn<(value: boolean) => void>()
  render(
    <LabelledCheckbox checked={false} onChange={onChange} {...props}>
      ヘッダを追従させる
    </LabelledCheckbox>,
  )
  // ui-sdk はマウント後の更新をマイクロタスクで行うので、それを act の中で済ませる
  await act(async () => {})
  return { onChange, checkbox: screen.getByRole('checkbox', { name: 'ヘッダを追従させる' }) }
}

describe('LabelledCheckbox', () => {
  it('names the checkbox with its label', async () => {
    const { checkbox } = await renderCheckbox()
    expect(checkbox).toBeInTheDocument()
  })

  it('shows a checked checkbox when checked', async () => {
    const { checkbox } = await renderCheckbox({ checked: true })
    expect(checkbox).toBeChecked()
  })

  it('shows an unchecked checkbox when not checked', async () => {
    const { checkbox } = await renderCheckbox({ checked: false })
    expect(checkbox).not.toBeChecked()
  })

  it.each([
    { checked: false, next: true },
    { checked: true, next: false },
  ])('calls onChange($next) when the checkbox is pressed', async ({ checked, next }) => {
    const { checkbox, onChange } = await renderCheckbox({ checked })
    await act(async () => {
      checkbox.click()
    })
    expect(onChange).toHaveBeenCalledExactlyOnceWith(next)
  })

  it('calls onChange when the label text is pressed', async () => {
    const { onChange } = await renderCheckbox()
    await act(async () => {
      fireEvent.click(screen.getByText('ヘッダを追従させる'))
    })
    expect(onChange).toHaveBeenCalledExactlyOnceWith(true)
  })

  it('stays controlled by its checked prop', async () => {
    const { checkbox } = await renderCheckbox({ checked: false })
    await act(async () => {
      checkbox.click()
    })
    expect(checkbox).not.toBeChecked()
  })

  it('is a native button, so Space and Enter press it', async () => {
    const { checkbox } = await renderCheckbox()
    expect(checkbox.tagName).toBe('BUTTON')
    expect(checkbox).toHaveAttribute('type', 'button')
  })

  it('stays unchanged while disabled', async () => {
    const { checkbox, onChange } = await renderCheckbox({ disabled: true })
    expect(checkbox).toBeDisabled()
    await act(async () => {
      checkbox.click()
      fireEvent.click(screen.getByText('ヘッダを追従させる'))
    })
    expect(onChange).not.toHaveBeenCalled()
  })
})
