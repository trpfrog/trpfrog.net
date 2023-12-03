import { parseDataLine } from './parseDataLine'

describe('parseDataLine', () => {
  test.each([
    ['1', [1]],
    [' 1 ', [1]],
    ['72', [72]],
    ['123', [123]],
  ])('should parse a single number with spaces', (input, output) => {
    expect(parseDataLine(input)).toEqual(output)
  })

  test.each([
    ['1 - 3', [1, 2, 3]],
    ['1- 3', [1, 2, 3]],
    ['5-12', [5, 6, 7, 8, 9, 10, 11, 12]],
    [' 5-12 ', [5, 6, 7, 8, 9, 10, 11, 12]],
    ['5 - 12', [5, 6, 7, 8, 9, 10, 11, 12]],
  ])('should parse range of numbers', (input, output) => {
    expect(parseDataLine(input)).toEqual(output)
  })

  test.each([
    ['a'],
    ['1-'],
    ['1-2-3'],
    ['1-2 -3-4'],
    ['3-a'],
    [''],
    ['- 7'],
    ['7-2'],
  ])('should return empty array if input is invalid', input => {
    expect(parseDataLine(input)).toEqual([])
  })

  test.each([
    ['1,2,3', [1, 2, 3]],
    ['1, 2, 3', [1, 2, 3]],
    ['1,2,3,4,5,6,7,8,9,10', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
    ['1, 3 - 5, 7, 9-10', [1, 3, 4, 5, 7, 9, 10]],
    ['6-10, 12, 14-16', [6, 7, 8, 9, 10, 12, 14, 15, 16]],
  ])('should parse multiple numbers', (input, output) => {
    expect(parseDataLine(input)).toEqual(output)
  })
})
