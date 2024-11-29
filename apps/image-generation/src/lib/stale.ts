import { differenceInMinutes } from 'date-fns'

export function isStale(
  minUpdateMinutes: number,
  lastGenerated: number | Date,
  now: number | Date = new Date(),
): {
  shouldCache: boolean
  waitMinutes: number
} {
  const minutesAfterLastUpdated = differenceInMinutes(now, lastGenerated)
  return {
    shouldCache: minutesAfterLastUpdated <= minUpdateMinutes,
    waitMinutes: Math.max(0, minUpdateMinutes - minutesAfterLastUpdated),
  }
}
