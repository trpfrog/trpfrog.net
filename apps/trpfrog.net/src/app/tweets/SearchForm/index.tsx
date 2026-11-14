'use client'
import { Field, FieldLabel } from '@ui-sdk/react/field'

import { SubmitButton, TextInput } from '@/components/atoms/FormControls'

import styles from './index.module.css'

export function SearchForm(props: { defaultValue?: string }) {
  return (
    <form action="/tweets#tweets" method="get" className={styles.searchForm}>
      <Field name="q">
        <FieldLabel className="tw:sr-only">ツイート検索</FieldLabel>
        <TextInput placeholder="ツイート検索" defaultValue={props.defaultValue} />
      </Field>
      <SubmitButton>検索</SubmitButton>
    </form>
  )
}
