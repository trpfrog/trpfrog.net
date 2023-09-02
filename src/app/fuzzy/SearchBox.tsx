'use client'

export default function SearchBox() {
  return (
    <div>
      https://trpfrog.net/fuzzy/{' '}
      <input type="text" name="url" placeholder="fuzzy-string" />
      <input
        type="submit"
        value="Go"
        onClick={() => {
          // @ts-ignore
          const url = document.querySelector('input[name="url"]').value
          if (url) {
            window.location.href = `https://trpfrog.net/fuzzy/${url}`
          }
        }}
      />
    </div>
  )
}
