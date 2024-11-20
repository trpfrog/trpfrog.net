import { differenceInMinutes } from 'date-fns'

export function isImageStale(
  lastGenerated: number | Date,
  now: number | Date = new Date(),
  minUpdateMinutes: number = 180, // default to 3 hours
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
