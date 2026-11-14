'use client'
import { SubmitButton, TextInput } from '@/components/atoms/FormControls'

import styles from './index.module.css'

export function SearchForm(props: { defaultValue?: string }) {
  return (
    <form action="/tweets#tweets" method="get" className={styles.searchForm}>
      <TextInput
        name="q"
        aria-label="ツイート検索"
        placeholder="ツイート検索"
        defaultValue={props.defaultValue}
      />
      <SubmitButton>検索</SubmitButton>
    </form>
  )
}
