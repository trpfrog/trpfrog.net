import { connection, NextRequest, NextResponse } from 'next/server'

import { format, subYears } from 'date-fns'

// 「1年前」はアクセスした時点で決まるので、ページの描画ではなくここで計算する
export async function GET(req: NextRequest) {
  await connection()
  const oneYearAgo = format(subYears(new Date(), 1), 'yyyy-MM-dd')
  const url = new URL('/tweets', req.url)
  url.searchParams.set('q', `date:${oneYearAgo}`)
  url.hash = 'tweets'
  return NextResponse.redirect(url)
}
