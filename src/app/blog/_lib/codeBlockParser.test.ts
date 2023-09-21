import {
  parseTitleAndBody,
  parseColonSeparatedList,
  parseColonSeparatedDict,
  parseObjectList,
} from './codeBlockParser'

describe('parseTitleAndBody', () => {
  it('should parse title and body', () => {
    const { title, body } = parseTitleAndBody(['title', 'body'].join('\n'))
    expect(title).toBe('title')
    expect(body).toBe('body')
  })

  it('should parse title and body with multiple lines', () => {
    const { title, body } = parseTitleAndBody(
      ['title', 'body', 'body', 'body'].join('\n'),
    )
    expect(title).toBe('title')
    expect(body).toBe('body\nbody\nbody')
  })

  it('should parse title and body with empty lines', () => {
    const { title, body } = parseTitleAndBody(
      ['title', '', '', 'body', '', ''].join('\n'),
    )
    expect(title).toBe('title')
    expect(body).toBe('body')
  })

  it('should parse title and body with leading and trailing empty lines', () => {
    const { title, body } = parseTitleAndBody(
      ['', '', 'title', '', '', 'body', '', ''].join('\n'),
    )
    expect(title).toBe('title')
    expect(body).toBe('body')
  })

  it('should not remove line breaks between body', () => {
    const { title, body } = parseTitleAndBody(
      ['title', '', 'body', '', '', 'body', ''].join('\n'),
    )
    expect(title).toBe('title')
    expect(body).toBe('body\n\n\nbody')
  })
})

/////////////////////////////////////////////////////////////////////////////////////////////////

describe('parseColonSeparatedList', () => {
  it('should parse a list of key-value pairs', () => {
    const parsedList = parseColonSeparatedList(
      ['key1: value1', 'key2: value2'].join('\n'),
    )
    expect(parsedList).toEqual([
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
    ])
  })

  it('should parse a list with duplicate keys', () => {
    const parsedList = parseColonSeparatedList(
      ['key1: value1', 'key1: value2', 'key2: value3'].join('\n'),
    )

    expect(parsedList).toEqual([
      { key: 'key1', value: 'value1' },
      { key: 'key1', value: 'value2' },
      { key: 'key2', value: 'value3' },
    ])
  })

  it('should parse a list with empty lines', () => {
    const parsedList = parseColonSeparatedList(
      ['  ', 'key1: value1', '  ', 'key2: value2', '  '].join('\n'),
    )
    expect(parsedList).toEqual([
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
    ])
  })

  it('should parse a list with leading and trailing spaces in keys and values', () => {
    const parsedList = parseColonSeparatedList(
      ['key1  :  value1  ', '  key2 :value2   ', 'key3:  value3  '].join('\n'),
    )
    expect(parsedList).toEqual([
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
      { key: 'key3', value: 'value3' },
    ])
  })

  it('should parse a list with line breaks in value', () => {
    const parsedList = parseColonSeparatedList(
      ['key1: value1', 'key2: value2 line1', '  line2  ', 'key3: value3'].join(
        '\n',
      ),
    )
    expect(parsedList).toEqual([
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2 line1\n  line2' },
      { key: 'key3', value: 'value3' },
    ])
  })
})

/////////////////////////////////////////////////////////////////////////////////////////////////

describe('parseColonSeparatedDict', () => {
  it('should parse a list of key-value pairs', () => {
    const parsedDict = parseColonSeparatedDict('key1: value1\nkey2: value2')
    expect(parsedDict).toEqual({
      key1: 'value1',
      key2: 'value2',
    })
  })

  it('should parse a list with duplicate keys and overwrite the values', () => {
    const parsedDict = parseColonSeparatedDict(
      'key1: value1\nkey1: value2\nkey2: value3',
    )
    expect(parsedDict).toEqual({
      key1: 'value2',
      key2: 'value3',
    })
  })

  it('should parse a list with empty lines', () => {
    const parsedDict = parseColonSeparatedDict(
      '  \nkey1: value1\n  \nkey2: value2\n  \n',
    )
    expect(parsedDict).toEqual({
      key1: 'value1',
      key2: 'value2',
    })
  })

  it('should parse a list with leading and trailing spaces in keys and values', () => {
    const parsedDict = parseColonSeparatedDict(
      'key1  :  value1  \n  key2 :value2   \nkey3:  value3  ',
    )
    expect(parsedDict).toEqual({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    })
  })

  it('should parse a list with line breaks in value', () => {
    const parsedDict = parseColonSeparatedDict(
      'key1: value1\nkey2: value2 line1\n  line2  \nkey3: value3',
    )
    expect(parsedDict).toEqual({
      key1: 'value1',
      key2: 'value2 line1\n  line2',
      key3: 'value3',
    })
  })
})

/////////////////////////////////////////////////////////////////////////////////////////////////

describe('parseObjectList', () => {
  it('should parse a list of objects', () => {
    const parsedList = parseObjectList(
      `key1: value1
key2: value2
---
key3: value3
key4: value4`,
    )
    expect(parsedList).toEqual([
      { key1: 'value1', key2: 'value2' },
      { key3: 'value3', key4: 'value4' },
    ])
  })

  it('should parse a list of objects with empty lines and leading/trailing spaces', () => {
    const parsedList = parseObjectList(
      `  

key1: value1
  key2: value2
---


  key3 : value3
  key4  :  
              value4
      
  



`,
    )
    expect(parsedList).toEqual([
      { key1: 'value1', key2: 'value2' },
      { key3: 'value3', key4: 'value4' },
    ])
  })

  it('should parse a list with line breaks in values', () => {
    const parsedList = parseObjectList(
      `key1: value1
key2: value2
---
key3: value3
  line1
  line2
key4: value4`,
    )
    expect(parsedList).toEqual([
      { key1: 'value1', key2: 'value2' },
      { key3: 'value3\n  line1\n  line2', key4: 'value4' },
    ])
  })

  it('should parse a list with duplicate keys in objects', () => {
    const parsedList = parseObjectList(
      `key1: value1
key2: value2
---
key1: value3
key2: value4`,
    )
    expect(parsedList).toEqual([
      { key1: 'value1', key2: 'value2' },
      { key1: 'value3', key2: 'value4' },
    ])
  })

  it('should trim empty objects', () => {
    const parsedList = parseObjectList(`
---
key1: value1
key2: value2
---
---
key3: value3
key4: value4
---`)
    expect(parsedList).toEqual([
      { key1: 'value1', key2: 'value2' },
      { key3: 'value3', key4: 'value4' },
    ])
  })
})
