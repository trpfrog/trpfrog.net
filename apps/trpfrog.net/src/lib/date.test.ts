import { formatDateTimeToDisplay, formatDateToDisplay } from './date'

describe('formatDateToDisplay', () => {
  test.for([
    { date: new Date('2023-04-22T12:34:56'), expected: '2023-04-22' },
    { date: new Date('2023-01-01T00:00:00'), expected: '2023-01-01' },
    { date: 0, expected: '1970-01-01' },
    { date: '2023-04-22T12:34:56', expected: '2023-04-22' },
    { date: '2023-01-01T00:00:00', expected: '2023-01-01' },
  ])(`%# $date => $expected`, ({ date, expected }) => {
    expect(formatDateToDisplay(date)).toBe(expected)
  })
})

describe('formatDateTimeToDisplay', () => {
  test.for([
    { date: new Date('2023-04-22T12:34:56'), expected: '2023-04-22 12:34' },
    { date: new Date('2023-01-01T00:00:00'), expected: '2023-01-01 00:00' },
    { date: 0, expected: '1970-01-01 09:00' },
    { date: '2023-04-22T12:34:56', expected: '2023-04-22 12:34' },
    { date: '2023-01-01T00:00:00', expected: '2023-01-01 00:00' },
  ])(`%# $date => $expected`, ({ date, expected }) => {
    expect(formatDateTimeToDisplay(date)).toBe(expected)
  })

  test('includeSeconds', () => {
    expect(formatDateTimeToDisplay(new Date('2023-04-22T12:34:56'), { includeSeconds: true })).toBe(
      '2023-04-22 12:34:56',
    )
  })
})
