import { TZDate } from '@date-fns/tz'
import { differenceInYears } from 'date-fns'
import { Hono } from 'hono'

export const app = new Hono()
  .get('/year', c => c.text(new TZDate(new Date(), 'Asia/Tokyo').getFullYear().toString()))
  .get('/age', c => {
    const birthday = new TZDate('2000-10-17', 'Asia/Tokyo')
    const today = new Date()
    const age = differenceInYears(today, birthday)
    return c.text(age.toString())
  })
