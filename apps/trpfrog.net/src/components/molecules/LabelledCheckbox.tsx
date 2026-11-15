import { ReactNode } from 'react'

import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Checkbox, CheckboxIndicator } from '@ui-sdk/react/checkbox'
import { Field, FieldLabel } from '@ui-sdk/react/field'

import { tv } from '@/lib/tailwind'

const styles = tv({
  slots: {
    label: [
      'tw:flex tw:items-baseline tw:gap-2 tw:cursor-pointer',
      'tw:has-data-disabled:cursor-not-allowed tw:has-data-disabled:opacity-50',
    ],
    checkbox: [
      'tw:inline-grid tw:size-4 tw:shrink-0 tw:translate-y-0.5 tw:place-items-center',
      'tw:rounded-sm tw:border-2 tw:border-gray-400 tw:bg-white tw:text-white',
      'tw:data-checked:border-trpfrog-500 tw:data-checked:bg-trpfrog-500',
      'tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2',
      'tw:focus-visible:outline-trpfrog-500',
    ],
    indicator: 'tw:text-[0.625rem] tw:leading-none',
  },
})()

export function LabelledCheckbox(props: {
  children: ReactNode
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <Field className={styles.label()}>
      <Checkbox
        className={styles.checkbox()}
        checked={props.checked}
        disabled={props.disabled}
        onCheckedChange={checked => props.onChange(checked === true)}
      >
        <CheckboxIndicator className={styles.indicator()}>
          <FontAwesomeIcon icon={faCheck} aria-hidden="true" />
        </CheckboxIndicator>
      </Checkbox>
      <FieldLabel>{props.children}</FieldLabel>
    </Field>
  )
}
