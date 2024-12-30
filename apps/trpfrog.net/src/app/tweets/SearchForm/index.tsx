'use client'
import { Input } from '@/components/wrappers'

import styles from './index.module.css'

export function SearchForm(props: { defaultValue?: string }) {
  return (
    <form action="/tweets#tweets" method="get" className={styles.searchForm}>
      <Input type="text" name="q" placeholder="ツイート検索" defaultValue={props.defaultValue} />
      <Input type="submit" value="検索" />
    </form>
  )
}
