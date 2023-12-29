'use client'
import { Input } from '@/components/wrappers/Input'

import styles from './index.module.scss'

export function SearchForm(props: { defaultValue?: string }) {
  return (
    <form action="/tweets#tweets" method="get" className={styles.searchForm}>
      <Input
        type="text"
        name="q"
        placeholder="ツイート検索"
        defaultValue={props.defaultValue}
      />
      <Input type="submit" value="検索" />
    </form>
  )
}
