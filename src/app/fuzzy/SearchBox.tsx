'use client'

import { tv } from 'tailwind-variants'

import { Input } from '@/components/wrappers'

const styles = tv({
  slots: {
    form: 'tw-flex tw-items-center tw-justify-center tw-gap-1',
  },
})()

export function SearchBox() {
  return (
    <form
      className={styles.form()}
      onSubmit={e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const url = form.get('url')
        if (typeof url === 'string' && url) {
          window.location.href = `https://trpfrog.net/fuzzy/${url}`
        }
      }}
    >
      <div>https://trpfrog.net/fuzzy/</div>
      <Input type="text" name="url" placeholder="fuzzy-string" pattern=".+" />
      <Input type="submit" value="Go" />
    </form>
  )
}
