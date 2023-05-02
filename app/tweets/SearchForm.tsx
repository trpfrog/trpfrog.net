'use client'
import styles from './SearchForm.module.scss'

export default function SearchForm(props: {defaultValue?: string}) {
  return (
    <form action="/tweets#tweets" method="get" className={styles.searchForm}>
      <input type="text" name="q" placeholder="ツイート検索" defaultValue={props.defaultValue} />
      <input type="submit" value="検索" />
    </form>
  )
}
