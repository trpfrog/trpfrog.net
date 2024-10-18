import { format } from 'date-fns'

/**
 * 画面表示用の日付フォーマットに変換する
 */
export function formatDateToDisplay(date: string | number | Date): string {
  return format(date, 'yyyy-MM-dd')
}

/**
 * 画面表示用の日時フォーマットに変換する
 */
export function formatDateTimeToDisplay(
  date: string | number | Date,
  options?: {
    includeSeconds?: boolean
  },
): string {
  if (options?.includeSeconds) {
    return format(date, 'yyyy-MM-dd HH:mm:ss')
  } else {
    return format(date, 'yyyy-MM-dd HH:mm')
  }
}
