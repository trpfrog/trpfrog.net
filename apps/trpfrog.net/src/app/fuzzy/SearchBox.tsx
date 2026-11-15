'use client'

import { Field, FieldLabel } from '@ui-sdk/react/field'

import { SubmitButton, TextInput } from '@/components/atoms/form-controls'
import { tv } from '@/lib/tailwind'

const styles = tv({
  slots: {
    form: 'tw:flex tw:items-center tw:justify-center tw:gap-1',
  },
})()

export function SearchBox() {
  return (
    <Field
      name="fuzzy-string"
      className={styles.form()}
      render={
        <form
          onSubmit={e => {
            e.preventDefault()
            const query = new FormData(e.currentTarget).get('fuzzy-string')
            if (typeof query === 'string' && query) {
              window.location.href = `https://trpfrog.net/fuzzy/${encodeURIComponent(query)}`
            }
          }}
        />
      }
    >
      <FieldLabel>https://trpfrog.net/fuzzy/</FieldLabel>
      <TextInput placeholder="fuzzy-string" pattern=".+" />
      <SubmitButton>Go</SubmitButton>
    </Field>
  )
}
