'use client'
import { Field, FieldLabel } from '@ui-sdk/react/field'

import { SubmitButton, TextInput } from '@/components/atoms/form-controls'

import styles from './index.module.css'

export function SearchForm(props: { defaultValue?: string }) {
  return (
    <Field
      name="q"
      className={styles.searchForm}
      render={<form action="/tweets#tweets" method="get" />}
    >
      <FieldLabel className="tw:sr-only">ツイート検索</FieldLabel>
      <TextInput placeholder="ツイート検索" defaultValue={props.defaultValue} />
      <SubmitButton>検索</SubmitButton>
    </Field>
  )
}
