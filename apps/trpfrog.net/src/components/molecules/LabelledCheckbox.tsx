import { ReactNode, useId } from 'react'

export function LabelledCheckbox(props: {
  children: ReactNode
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => void
}) {
  const id = useId()
  return (
    <div className="tw:flex tw:items-baseline tw:gap-2">
      <input
        type="checkbox"
        id={id}
        className="tw:accent-trpfrog-200"
        checked={props.checked}
        disabled={props.disabled}
        onChange={e => {
          props.onChange(e.target.checked)
        }}
      />
      <label htmlFor={id}>{props.children}</label>
    </div>
  )
}
