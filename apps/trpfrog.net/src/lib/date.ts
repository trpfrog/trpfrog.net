import { TZDate } from '@date-fns/tz'
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

/**
 * 現在の年齢を日本時間基準で取得する
 */
export function getCurrentAge(now: Date = new Date()): number {
  const todayInTokyo = new TZDate(now, 'Asia/Tokyo')
  const age = todayInTokyo.getFullYear() - 2000
  const hasHadBirthdayThisYear =
    todayInTokyo.getMonth() + 1 > 10 ||
    (todayInTokyo.getMonth() + 1 === 10 && todayInTokyo.getDate() >= 17)

  return hasHadBirthdayThisYear ? age : age - 1
}
