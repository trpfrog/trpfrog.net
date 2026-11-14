'use client'

import { SubmitButton, TextInput } from '@/components/atoms/FormControls'
import { tv } from '@/lib/tailwind'

const styles = tv({
  slots: {
    form: 'tw:flex tw:items-center tw:justify-center tw:gap-1',
  },
})()

export function SearchBox() {
  return (
    <form
      className={styles.form()}
      onSubmit={e => {
        e.preventDefault()
        const query = new FormData(e.currentTarget).get('fuzzy-string')
        if (typeof query === 'string' && query) {
          window.location.href = `https://trpfrog.net/fuzzy/${encodeURIComponent(query)}`
        }
      }}
    >
      <div>https://trpfrog.net/fuzzy/</div>
      <TextInput
        name="fuzzy-string"
        aria-label="fuzzy-string"
        placeholder="fuzzy-string"
        pattern=".+"
      />
      <SubmitButton>Go</SubmitButton>
    </form>
  )
}
