'use client'

import { useEffect, useState } from 'react'

import { Input } from '@/components/wrappers'

import { tv } from '@/lib/tailwind/variants'

const styles = tv({
  slots: {
    form: 'tw-flex tw-items-center tw-justify-center tw-gap-1',
  },
})()

export function SearchBox() {
  const [query, setQuery] = useState<string | null>(null)
  useEffect(() => {
    if (query != null) {
      window.location.href = `https://trpfrog.net/fuzzy/${query}`
    }
  }, [query])

  return (
    <form
      className={styles.form()}
      onSubmit={e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const query = form.get('fuzzy-string')
        if (typeof query === 'string' && query) {
          setQuery(`https://trpfrog.net/fuzzy/${query}`)
        }
      }}
    >
      <div>https://trpfrog.net/fuzzy/</div>
      <Input type="text" name="fuzzy-string" placeholder="fuzzy-string" pattern=".+" />
      <Input type="submit" value="Go" />
    </form>
  )
}
